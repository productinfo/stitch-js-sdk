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

import StitchServiceRoutes from "../../services/internal/StitchServiceRoutes";
import StitchAppAuthRoutes from "./StitchAppAuthRoutes";

const BASE_ROUTE = "/api/client/v2.0";

function getAppRoute(clientAppId: string): string {
  return BASE_ROUTE + `/app/${clientAppId}`;
}

function getFunctionCallRoute(clientAppId: string): string {
  return getAppRoute(clientAppId) + "/functions/call";
}

class StitchAppRoutes {
  public readonly authRoutes: StitchAppAuthRoutes;
  public readonly serviceRoutes: StitchServiceRoutes;

  public readonly functionCallRoute: string;
  private readonly clientAppId: string;

  public constructor(clientAppId: string) {
    this.clientAppId = clientAppId;
    this.authRoutes = new StitchAppAuthRoutes(clientAppId);
    this.serviceRoutes = new StitchServiceRoutes(clientAppId);
    this.functionCallRoute = getFunctionCallRoute(clientAppId);
  }
}

export { BASE_ROUTE, getAppRoute, getFunctionCallRoute, StitchAppRoutes };
