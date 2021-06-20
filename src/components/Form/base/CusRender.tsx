/*
 * @Author: Vane
 * @Date: 2021-06-19 19:27:46
 * @LastEditTime: 2021-06-19 20:10:49
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vue-admin\src\components\Form\base\CusRender.tsx
 */

export default {
	name: 'CusRender',
	props: {
		render: Function
	},
	setup(props: any) {
		return () => 	props.render()
	},
}
