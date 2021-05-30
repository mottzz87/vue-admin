/*
 * @Author: Vane
 * @Date: 2021-05-31 04:00:27
 * @LastEditTime: 2021-05-31 04:02:30
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vue-admin\src\components\Form\index.ts
 */
import Form from './index.vue';

Form.install = function (Vue: any) {
	Vue.component(Form.name, Form);
};

export default Form;
