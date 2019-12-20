import * as c from "../constants";
import { constructRoleConfig, constructFieldConfig } from "../utils";

describe("utils", () => {
  describe("constructRoleConfig", () => {
    describe("validations", () => {
      it("throws error if no fieldConfigs", () => {
        expect(() =>
          constructRoleConfig({ fieldConfigs: undefined })
        ).toThrowError();
        expect(() =>
          constructRoleConfig({
            fieldConfigs: [
              constructFieldConfig({ type: c.FIELD_TYPE_MARKDOWN })
            ]
          })
        ).not.toThrowError();
      });

      it("throws error if no multi-reference fieldConfig includes other fieldConfigs", () => {
        expect(() =>
          constructRoleConfig({
            fieldConfigs: [
              constructFieldConfig({ type: c.FIELD_TYPE_MULTI_REFERENCE }),
              constructFieldConfig({ type: c.FIELD_TYPE_MARKDOWN })
            ]
          })
        ).toThrowError();

        expect(() =>
          constructRoleConfig({
            fieldConfigs: [
              constructFieldConfig({ type: c.FIELD_TYPE_MULTI_REFERENCE })
            ]
          })
        ).not.toThrowError();
      });
    });
  });
  describe("constructFieldConfig", () => {
    describe("validations", () => {
      it("throws error if no type", () => {
        expect(() => constructFieldConfig({ type: undefined })).toThrowError();
        expect(() =>
          constructFieldConfig({ type: c.FIELD_TYPE_MARKDOWN })
        ).not.toThrowError();
      });

      it("throws error if type is multi-reference and contentType is not array", () => {
        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: "hello"
          })
        ).toThrowError();

        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: undefined
          })
        ).not.toThrowError();

        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: ["hi"]
          })
        ).not.toThrowError();
      });

      it("throws error if no assetType when type is asset", () => {
        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: undefined
          })
        ).toThrowError();
        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ).not.toThrowError();
      });
    });
  });
});
