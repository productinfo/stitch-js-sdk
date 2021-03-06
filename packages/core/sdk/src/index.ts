/**
 * Copyright 2018-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BSON from "bson";
import AuthInfo from "./auth/internal/AuthInfo";
import CoreStitchAuth from "./auth/internal/CoreStitchAuth";
import CoreStitchUser from "./auth/internal/CoreStitchUser";
import CoreStitchUserImpl from "./auth/internal/CoreStitchUserImpl";
import DeviceFields from "./auth/internal/DeviceFields";
import ApiStitchUserIdentity from "./auth/internal/models/ApiStitchUserIdentity";
import StitchAuthRequestClient from "./auth/internal/StitchAuthRequestClient";
import { StitchAuthRoutes } from "./auth/internal/StitchAuthRoutes";
import StitchUserFactory from "./auth/internal/StitchUserFactory";
import StitchUserProfileImpl from "./auth/internal/StitchUserProfileImpl";
import AnonymousAuthProvider from "./auth/providers/anonymous/AnonymousAuthProvider";
import AnonymousCredential from "./auth/providers/anonymous/AnonymousCredential";
import CustomAuthProvider from "./auth/providers/custom/CustomAuthProvider";
import CustomCredential from "./auth/providers/custom/CustomCredential";
import FacebookAuthProvider from "./auth/providers/facebook/FacebookAuthProvider";
import FacebookCredential from "./auth/providers/facebook/FacebookCredential";
import GoogleAuthProvider from "./auth/providers/google/GoogleAuthProvider";
import GoogleCredential from "./auth/providers/google/GoogleCredential";
import StitchAuthCredential from "./auth/providers/internal/StitchAuthResponseCredential";
import StitchAuthResponseCredential from "./auth/providers/internal/StitchAuthResponseCredential";
import ServerApiKeyAuthProvider from "./auth/providers/serverapikey/ServerApiKeyAuthProvider";
import ServerApiKeyCredential from "./auth/providers/serverapikey/ServerApiKeyCredential";
import CoreUserApiKeyAuthProviderClient from "./auth/providers/userapikey/CoreUserApiKeyAuthProviderClient";
import UserApiKey from "./auth/providers/userapikey/models/UserApiKey";
import UserApiKeyAuthProvider from "./auth/providers/userapikey/UserApiKeyAuthProvider";
import UserApiKeyCredential from "./auth/providers/userapikey/UserApiKeyCredential";
import CoreUserPassAuthProviderClient from "./auth/providers/userpass/CoreUserPasswordAuthProviderClient";
import UserPasswordAuthProvider from "./auth/providers/userpass/UserPasswordAuthProvider";
import UserPasswordCredential from "./auth/providers/userpass/UserPasswordCredential";
import StitchCredential from "./auth/StitchCredential";
import StitchUserIdentity from "./auth/StitchUserIdentity";
import StitchUserProfile from "./auth/StitchUserProfile";
import UserType from "./auth/UserType";
import Assertions from "./internal/common/Assertions"
import { base64Decode, base64Encode, utf8Slice } from "./internal/common/Base64";
import { Codec, Decoder, Encoder } from "./internal/common/Codec";
import { MemoryStorage, Storage } from "./internal/common/Storage";
import { handleRequestError } from "./internal/common/StitchErrorUtils";
import CoreStitchAppClient from "./internal/CoreStitchAppClient";
import { BasicRequest } from "./internal/net/BasicRequest";
import ContentTypes from "./internal/net/ContentTypes";
import Event from "./internal/net/Event";
import EventListener from "./internal/net/EventListener";
import EventStream from "./internal/net/EventStream";
import BaseEventStream from "./internal/net/BaseEventStream";
import StitchEvent from "./internal/net/StitchEvent";
import FetchTransport from "./internal/net/FetchTransport";
import Headers from "./internal/net/Headers";
import Method from "./internal/net/Method";
import Response from "./internal/net/Response";
import Stream from "./Stream";
import StreamListener from "./StreamListener";
import StitchAppAuthRoutes from "./internal/net/StitchAppAuthRoutes";
import StitchAppRequestClient from "./internal/net/StitchAppRequestClient";
import StitchAppRoutes from "./internal/net/StitchAppRoutes";
import { StitchAuthRequest } from "./internal/net/StitchAuthRequest";
import StitchRequestClient from "./internal/net/StitchRequestClient";
import Transport from "./internal/net/Transport";
import CoreStitchServiceClient from "./services/internal/CoreStitchServiceClient";
import CoreStitchServiceClientImpl from "./services/internal/CoreStitchServiceClientImpl";
import StitchServiceRoutes from "./services/internal/StitchServiceRoutes";
import { StitchAppClientConfiguration } from "./StitchAppClientConfiguration";
import StitchAppClientInfo from "./StitchAppClientInfo";
import StitchClientError from "./StitchClientError";
import { StitchClientErrorCode } from "./StitchClientErrorCode";
import StitchError from "./StitchError";
import StitchRequestError from "./StitchRequestError";
import { StitchRequestErrorCode } from "./StitchRequestErrorCode";
import StitchServiceError from "./StitchServiceError";
import { StitchServiceErrorCode } from "./StitchServiceErrorCode";

export {
  BSON,
  AuthInfo,
  StitchAuthResponseCredential,
  AnonymousAuthProvider,
  AnonymousCredential,
  ApiStitchUserIdentity,
  CustomAuthProvider,
  CustomCredential,
  FacebookAuthProvider,
  FacebookCredential,
  GoogleAuthProvider,
  GoogleCredential,
  ServerApiKeyAuthProvider,
  ServerApiKeyCredential,
  UserApiKeyAuthProvider,
  UserApiKey,
  UserApiKeyCredential,
  StitchAuthCredential,
  Codec,
  Decoder,
  Encoder,
  StitchError,
  StitchClientError,
  StitchClientErrorCode,
  CoreUserApiKeyAuthProviderClient,
  UserPasswordAuthProvider,
  UserPasswordCredential,
  CoreUserPassAuthProviderClient,
  CoreStitchAppClient,
  CoreStitchAuth,
  CoreStitchServiceClient,
  CoreStitchUser,
  CoreStitchUserImpl,
  DeviceFields,
  BasicRequest,
  ContentTypes,
  Event,
  EventListener,
  EventStream,
  BaseEventStream,
  StitchEvent,
  FetchTransport,
  Headers,
  Stream,
  StreamListener,
  StitchAppClientInfo,
  StitchAppClientConfiguration,
  StitchAppRequestClient,
  StitchAppRoutes,
  StitchAuthRequest,
  StitchAuthRequestClient,
  StitchAuthRoutes,
  StitchCredential,
  StitchRequestClient,
  StitchRequestError,
  StitchRequestErrorCode,
  StitchServiceRoutes,
  StitchServiceError,
  StitchServiceErrorCode,
  StitchUserFactory,
  StitchUserProfile,
  StitchUserProfileImpl,
  CoreStitchServiceClientImpl,
  StitchUserIdentity,
  StitchAppAuthRoutes,
  Storage,
  Method,
  Response,
  MemoryStorage,
  handleRequestError,
  Transport,
  UserType,
  Assertions,
  base64Decode,
  base64Encode,
  utf8Slice
};
