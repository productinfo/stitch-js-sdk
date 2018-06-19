import { Binary, ObjectID } from "bson";
import { AnonymousCredential } from "mongodb-stitch-browser-core";
import { BaseStitchWebIntTestHarness } from "mongodb-stitch-browser-testutils";
import {
  Anon,
  App,
  AppResponse,
  AwsS3,
  AwsS3Actions,
  AwsS3RuleCreator,
  Service
} from "mongodb-stitch-core-admin-client";
import {
  FetchTransport,
  Method,
  StitchServiceErrorCode,
  StitchServiceException
} from "mongodb-stitch-core-sdk";
import { AwsS3ServiceClient } from "../src";

const harness = new BaseStitchWebIntTestHarness();

const awsAccessKeyIdEnvVar = "TEST_STITCH_AWS_ACCESS_KEY_ID";
const awsSecretAccessKeyEnvVar = "TEST_STITCH_AWS_SECRET_ACCESS_KEY";

const awsAccessKeyId: string | undefined = (() => {
  return process.env[awsAccessKeyIdEnvVar];
})();

const awsSecretAccessKey: string | undefined = (() => {
  return process.env[awsSecretAccessKeyEnvVar];
})();

beforeAll(() => harness.setup());
afterAll(() => harness.teardown());

const test = awsAccessKeyId && awsSecretAccessKey ? it : it.skip;

describe("AwsS3ServiceClient", () => {
  test("should put object", async () => {
    const [appResponse, app] = await harness.createApp();
    await harness.addProvider(app as App, new Anon());
    const [svcResponse, svc] = await harness.addService(
      app as App,
      "aws-s3",
      new AwsS3("awss31", {
        accessKeyId: awsAccessKeyId!,
        region: "us-east-1",
        secretAccessKey: awsSecretAccessKey!
      })
    );
    await harness.addRule(
      svc as Service,
      new AwsS3RuleCreator("default", [AwsS3Actions.Put])
    );

    const client = harness.getAppClient(appResponse as AppResponse);
    await client.auth.loginWithCredential(new AnonymousCredential());

    const awsS3 = client.getServiceClient(AwsS3ServiceClient.factory, "awss31");

    // Putting to an bad bucket should fail
    const bucket = "notmystuff";
    const key = new ObjectID().toHexString();
    const acl = "public-read";
    const contentType = "plain/text";
    const body = "hello again friend; did you miss me";

    try {
      await awsS3.putObject(bucket, key, acl, contentType, body);
      fail();
    } catch (error) {
      expect(error instanceof StitchServiceException).toBeTruthy();
      expect(error.errorCode).toEqual(StitchServiceErrorCode.AWSError);
    }

    // Putting with all good params for S3 should work
    const bucketGood = "stitch-test-sdkfiles";
    const transport = new FetchTransport();

    let result = await awsS3.putObject(bucketGood, key, acl, contentType, body);
    let expectedLocation = `https://stitch-test-sdkfiles.s3.amazonaws.com/${key}`;
    expect(result.location).toEqual(expectedLocation);

    let httpResult = await transport.roundTrip({
      method: Method.GET,
      url: expectedLocation
    } as any);
    expect(httpResult.body).toEqual(body);

    const bodyBin = new Binary(new Buffer(body));
    result = await awsS3.putObject(bucketGood, key, acl, contentType, bodyBin);
    expectedLocation = `https://stitch-test-sdkfiles.s3.amazonaws.com/${key}`;
    expect(result.location).toEqual(expectedLocation);

    httpResult = await transport.roundTrip({
      method: Method.GET,
      url: expectedLocation
    } as any);
    expect(httpResult.body).toEqual(body);

    result = await awsS3.putObject(bucketGood, key, acl, contentType, bodyBin);
    expectedLocation = `https://stitch-test-sdkfiles.s3.amazonaws.com/${key}`;
    expect(result.location).toEqual(expectedLocation);

    httpResult = await transport.roundTrip({
      method: Method.GET,
      url: expectedLocation
    } as any);
    expect(httpResult.body).toEqual(body);

    /** @see: https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String */
    function str2ab(str): Uint8Array {
      const buf = new ArrayBuffer(str.length); // 2 bytes for each char
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    }

    const bodyInput = str2ab(body);
    result = await awsS3.putObject(
      bucketGood,
      key,
      acl,
      contentType,
      bodyInput
    );
    expectedLocation = `https://stitch-test-sdkfiles.s3.amazonaws.com/${key}`;
    expect(result.location).toEqual(expectedLocation);

    httpResult = await transport.roundTrip({
      method: Method.GET,
      url: expectedLocation
    } as any);
    expect(httpResult.body).toEqual(body);

    // Excluding any required parameters should fail
    try {
      await awsS3.putObject("", key, acl, contentType, body);
      fail();
    } catch (error) {
      expect(error instanceof StitchServiceException).toBeTruthy();
      expect(error.errorCode).toEqual(StitchServiceErrorCode.InvalidParameter);
    }
  });
});