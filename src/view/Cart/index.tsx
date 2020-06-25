import React, { PropsWithChildren } from 'react'
import './index.scss'
import { connect } from "react-redux";
import actions from "src/store/actions/cart";
import { CombinedState, CartState, Lesson, CartItem } from 'src/typings';
import { RouteComponentProps } from 'react-router-dom';
import { Table, InputNumber, Popconfirm, Button, Row, Col, Badge } from "antd";
import Nav from 'src/components/Nav';
interface Params {

}

// TODO 通过ReturnType typeof返回类型 IDE props. 可以直接获取cart
type Props = PropsWithChildren<RouteComponentProps<Params> & ReturnType<typeof mapStateToProps> & typeof actions>

console.log(typeof actions);

function Cart(props: Props) {
	const columns = [{
		title: '商品',
		//key: 'lesson',
		dataIndex: 'lesson',
		render: (val: Lesson, row: CartItem) => {
			return (<>
				<p>{val.title}</p>
				<p>单价{val.price}</p>
			</>)
		}
	}, {
		title: '数量',
		dataIndex: 'count',
		render: (val: number, row: CartItem) => {
			return (<>
				<InputNumber
					size="small"
					min={1}
					value={val}
					onChange={(value) => props.changeCartItemCount(row.lesson.id, value as number)}
				/>
			</>)
		}
	},
	{
		title: '操作',
		render: (val: number, row: CartItem) => {
			return (<>
				<Popconfirm
					title='是否要删除商品'
					onConfirm={() => props.removeCartItem(row.lesson.id)}
					okText='是'
					cancelText='否'
				>
					<Button size='small'>删除</Button>
				</Popconfirm>
			</>)
		}
	}]


	const rowSelection = {
		selectedRowKeys: props.cart.filter(item => item.checked).map(item => item.lesson.id),
		onChange: (selectedRowKeys: any, selectedRows: any) => {
			console.log(selectedRowKeys);
			props.changeCheckedCartItems(selectedRowKeys)
		}
	}
	const total = props.cart.filter(item => item.checked).reduce((total: number, item: CartItem) => total + item.count, 0)

	const price = props.cart.filter(item => item.checked).reduce((total: number, item: CartItem) => (total + (item.count * Number(item.lesson.price))), 0)

	return (
		// <div className='cart-box-view'>
		<div>

			<Nav history={props.history}>
			</Nav>

			<Table
				columns={columns}
				dataSource={props.cart}
				pagination={false}
				rowSelection={rowSelection}
				rowKey={row => row.lesson.id}
			/>


			<Row style={{ padding: '5px' }}>
				<Col span={4}>
					<Button size='small' onClick={props.clearCartItems}>清空</Button>
				</Col>
				<Col span={4}>
					
					已经选择了{total > 0 ? <Badge count={total}></Badge> : 0}件商品
				</Col>
				<Col span={4}>
					金额共计{price}元
				</Col>
				<Col span={4}>
					<Button size='small' onClick={props.settle}>结算</Button>
				</Col>
			</Row>
		</div>

	)
}
let mapStateToProps = (state: CombinedState): { cart: CartState } => ({ cart: state.cart })
export default connect(mapStateToProps, actions)(Cart as any)