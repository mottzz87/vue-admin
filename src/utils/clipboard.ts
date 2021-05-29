/*
 * @Author       : Zhao Dongxu
 * @Desc         :
 * @Date         : 2021-04-27 10:46:44
 * @LastEditors  : Zhao Dongxu
 * @LastEditTime : 2021-04-27 11:19:22
 * @FilePath     : \src\utils\clipboard.ts
 */
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

export default function clipboard(event: any, text: any) {
	const clipboard = new Clipboard(event.target, {
		text: () => text,
	})
	clipboard.on('success', () => {
		ElMessage.success('复制成功')
		clipboard.destroy()
	})
	clipboard.on('error', () => {
		clipboard.destroy()
	})
	clipboard.onClick(event)
}
