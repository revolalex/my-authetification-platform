import { mount } from "@vue/test-utils";
import SignUp from "../src/components/SignUpForm";

describe("Mounted SignUp", () => {
  const wrapper = mount(SignUp);
  //PASSWAORD
  test("is vuelidate password work well good", async () => {
    wrapper.setData({ form: { password: makePasswordGood() } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.password.$invalid).toBe(false);
  });

  test("is vuelidate password work well error", async () => {
    wrapper.setData({ form: { password: "aze" } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
  });
  //NAME
  test("is vuelidate name work well good", async () => {
    wrapper.setData({ form: { name: makeNameGood() } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.name.$invalid).toBe(false);
  });
  test("is vuelidate name work well error", async () => {
    wrapper.setData({ form: { name: "az" } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.name.$invalid).toBe(true);
  });

  //EMAIL
  test("is vuelidate email work well good", async () => {
    wrapper.setData({ form: { email: makeEmail() } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.email.$invalid).toBe(false);
  });
  test("is vuelidate email work well eroor", async () => {
    wrapper.setData({ form: { email: "test@tet" } });
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.$v.form.email.$invalid).toBe(true);
  });
});

function makeEmail() {
  var strValues = "abcdefg12345";
  var strEmail = "";
  var strTmp;
  for (var i = 0; i < 10; i++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strTmp = "";
  strEmail = strEmail + "@";
  for (var j = 0; j < 8; j++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strEmail = strEmail + ".com";
  return strEmail;
}

function makePasswordGood() {
  var password = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 9; i++)
    password += possible.charAt(Math.floor(Math.random() * possible.length));

  return password;
}

function makeNameGood() {
  var name = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));

  return name;
}
