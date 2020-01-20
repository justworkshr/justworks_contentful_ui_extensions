import * as c from "../constants";
import * as u from "../utilities";

describe("utils", () => {
  describe("u.constructRoleConfig", () => {
    describe("validations", () => {
      it("throws error if no fieldConfigs", () => {
        expect(() =>
          u.constructRoleConfig({ fieldConfigs: undefined })
        ).toThrowError();
        expect(() =>
          u.constructRoleConfig({
            fieldConfigs: [
              u.constructFieldConfig({ type: c.PROPERTY_TYPE_MARKDOWN })
            ]
          })
        ).not.toThrowError();
      });

      it("throws error if no multi-reference fieldConfig includes other fieldConfigs", () => {
        expect(() =>
          u.constructRoleConfig({
            fieldConfigs: [
              u.constructFieldConfig({ type: c.FIELD_TYPE_MULTI_REFERENCE }),
              u.constructFieldConfig({ type: c.PROPERTY_TYPE_MARKDOWN })
            ]
          })
        ).toThrowError();

        expect(() =>
          u.constructRoleConfig({
            fieldConfigs: [
              u.constructFieldConfig({ type: c.FIELD_TYPE_MULTI_REFERENCE })
            ]
          })
        ).not.toThrowError();
      });
    });
  });
  describe("u.constructFieldConfig", () => {
    describe("validations", () => {
      it("throws error if no type", () => {
        expect(() =>
          u.constructFieldConfig({ type: undefined })
        ).toThrowError();
        expect(() =>
          u.constructFieldConfig({ type: c.PROPERTY_TYPE_MARKDOWN })
        ).not.toThrowError();
      });

      it("throws error if type is multi-reference and contentType is not array", () => {
        expect(() =>
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: "hello"
          })
        ).toThrowError();

        expect(() =>
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: undefined
          })
        ).not.toThrowError();

        expect(() =>
          u.constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: ["hi"]
          })
        ).not.toThrowError();
      });

      it("throws error if no assetType when type is asset", () => {
        expect(() =>
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: undefined
          })
        ).toThrowError();
        expect(() =>
          u.constructFieldConfig({
            type: c.FIELD_TYPE_ASSET,
            assetType: c.ASSET_TYPE_IMAGE
          })
        ).not.toThrowError();
      });
    });
  });
});
