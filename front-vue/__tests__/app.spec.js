import { mount } from "@vue/test-utils";
import SignUp from "../src/components/SignUpForm";


describe("Mounted SignUp", () => {
  const wrapper = mount(SignUp);

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test ("is vuelidate name work well", () => {
      wrapper.setData({name: "al"})
      const nameValidator = wrapper.find("")
  })










});
