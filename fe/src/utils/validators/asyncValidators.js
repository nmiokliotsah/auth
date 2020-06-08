import { api } from "../../api/api";

const asyncValidate = values => {
  if (values.username) {
    return api.getUserByUsername(values.username)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.length) {
          throw { username: 'This name is taken' };
        }
      });
  }
  if (values.email) {
    return api.getUserByEmail(values.email)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.length) {
          throw { email: 'This email is taken' };
        }
      });
  }
}


// const asyncValidate = (values, dispatch, props, field) => {
//   const previousError = props.asyncErrors;
//   // console.log(props.touchOnBlur)
//   // console.log(previousError)
//   // console.log("field: "+ field, "value:" + values.username)
//   console.log(props)
//   if (values.username && field === 'username') {
//     return api.getUserByUsername(values.username)
//       .then(res => {
//         return res.json();
//       })
//       .then(res => {
//         if (res.length) {
//           throw Object.assign({}, previousError, { username: 'This name is taken' });
//         }
//       });
//   }
//   if (values.email && field === 'email') {
//     return api.getUserByEmail(values.email)
//       .then(res => {
//         return res.json();
//       })
//       .then(res => {
//         if (res.length) {
//           throw Object.assign({}, previousError, { email: 'This email is taken' });
//         }
//       });
//   }
// }

export default asyncValidate;
