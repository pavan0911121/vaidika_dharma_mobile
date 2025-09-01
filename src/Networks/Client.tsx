import * as AsyncStore from "../asyncStore";
import URL from "./Endpoints";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

let isDialogOpen = false;
let isNetworkDialogOpen = false;
let forceLogoutTriggered = false;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type Client = (
  authToken: string | null,
  url: string,
  methodType: HttpMethod,
  body?: any,
  customConfig?: RequestInit,
  isValidate?: boolean
) => Promise<Response | void>;

const client: Client = async (
  authToken,
  url,
  methodType,
  body,
  customConfig,
  isValidate
) => {
  // ✅ Check network before API call
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    if (!isNetworkDialogOpen) {
      isNetworkDialogOpen = true;
      Alert.alert("Network Error", "Please try again later", [
        {
          text: "OK",
          onPress: () => {
            isNetworkDialogOpen = false;
          },
        },
      ]);
    }
    return;
  }

  // ✅ Build headers
  let headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    method: methodType,
    headers: { ...headers, ...customConfig?.headers },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    console.log("coming here");
    
    const response = await fetch(url, config);

    // Handle errors
    if (response.status >= 400) {
      console.warn("API error:", response.status, url);
    }

    // ✅ Refresh token logic
    if (response.status === 401 && isValidate) {
      const refreshToken = await AsyncStore.getData(
        AsyncStore.Keys.REFRESH_TOKEN
      );
      const refreshApiUrl = URL.REFRESHTOKEN();

      const refreshConfig: RequestInit = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: refreshToken
          ? JSON.stringify({ refreshToken })
          : undefined,
      };

      const refreshResponse = await fetch(refreshApiUrl, refreshConfig);
      const refreshData = await refreshResponse.clone().json();

      if (refreshResponse.status === 200) {
        try {
          await AsyncStore.storeData(
            AsyncStore.Keys.ACCESS_TOKEN,
            refreshData.accessToken
          );
          await AsyncStore.storeData(
            AsyncStore.Keys.REFRESH_TOKEN,
            refreshData.refreshToken
          );
          await AsyncStore.storeData(
            AsyncStore.Keys.USER_TOKEN,
            refreshData.accessToken
          );
        } catch {
          console.log("⚠️ Failed to store new tokens");
        }
      } else if (
        refreshResponse.status === 401 ||
        refreshResponse.status === 403
      ) {
        if (!forceLogoutTriggered) {
          console.log("⚠️ Refresh token expired, forcing logout");
          forceLogoutTriggered = true;
          // TODO: trigger logout flow here
        }
        return;
      }

      if (!isDialogOpen) {
        isDialogOpen = true;
        Alert.alert("Authentication failed", "Please restart the app", [
          {
            text: "OK",
            onPress: () => {
              isDialogOpen = false;
              // TODO: Restart app if needed
            },
          },
        ]);
      }
    }

    // Handle login API invalid creds
    if (response.status === 401 && !isValidate) {
      const errData = await response.clone().json();
      Alert.alert(errData.error, errData.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    return response;
  } catch (err: any) {
    console.error("❌ Network/Fetch Error: ", err, url);
    return Promise.reject(err?.message ?? "Something went wrong");
  }
};

// ✅ Helper methods
client.get = async function (endpoint: string, customConfig: RequestInit = {}, isValidate = true) {
  const token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, "GET", null, customConfig, isValidate);
};

client.post = async function (
  endpoint: string,
  body: any,
  customConfig: RequestInit = {},
  isValidate = true
) {
    console.log(endpoint,body, customConfig, isValidate,"endpoint");
    
//   const token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client("", endpoint, "POST", body, customConfig, isValidate);
};

client.put = async function (
  endpoint: string,
  body: any,
  customConfig: RequestInit = {},
  isValidate = true
) {
  const token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, "PUT", body, customConfig, isValidate);
};

client.delete = async function (
  endpoint: string,
  body?: any,
  customConfig: RequestInit = {},
  isValidate = true
) {
//   const token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, "DELETE", body, customConfig, isValidate);
};

// ✅ Parse response utility
export const parseAPIResponse = async (response: Response) => {
  try {
    const text = await response.text();
    const parsed = JSON.parse(text);

    if (response.ok) return parsed;

    if (response.status >= 500) {
      return Promise.reject({
        type: "ServerError",
        status: response.status,
        body: parsed,
      });
    }

    if (response.status <= 501) {
      return Promise.reject({
        type: "ApplicationError",
        status: response.status,
        body: parsed,
      });
    }
  } catch (err) {
    return Promise.reject({
      type: "InvalidJSON",
      status: response.status,
      body: await response.text(),
    });
  }
};

export default client;
