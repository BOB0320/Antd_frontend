// import { Button, Form, Input, InputNumber, notification } from "antd";
// import axios from "axios";
// import React from "react";

// class ProductCreate extends React.Component {
//   finish = async (values) => {
//     try {
//       await axios.post("http://localhost:3001/product", values);
//       notification.success({
//         message: "Product created successfully!",
//       });
//       this.props.history.push("/");
//     } catch (err) {
//       notification.error({
//         message: "Failed to create product.",
//       });
//     }
//   };

//   render() {
//     return (
//       <Form
//         onFinish={this.finish}
//         initialValues={{
//           name: "",
//           category: "",
//           price: undefined,
//         }}
//       >
//         <Form.Item
//           label="Name"
//           name="name"
//           rules={[
//             { required: true, message: "Please input the product name!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Category"
//           name="category"
//           rules={[
//             { required: true, message: "Please input the product category!" },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Price"
//           name="price"
//           rules={[
//             { required: true, message: "Please input the product price!" },
//           ]}
//         >
//           <InputNumber min={1} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Create
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// export default ProductCreate;
