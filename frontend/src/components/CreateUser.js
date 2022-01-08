import React from "react";
import Axios from 'axios';
import Redirect from 'react-dom';
import { Link, NavLink,Navigate} from 'react-router-dom';


export default class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RedirectState: false,
      server: '',
    }
  }
  componentDidMount() {
    const server = window.$name;
    this.setState({ server: server });
    let value = localStorage.getItem('token');
    if(value==null){
        this.setState({RedirectState:true});
        this.state.RedirectState = true;
        // alert(this.state.RedirectState);
    }

  }
  insertUser = (event) => {
    event.preventDefault();
    event.persist();
    Axios.post(this.state.server + 'CreateUserController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        address: this.address.value
      })
      .then(function (res) {
        if (res.data.valid == true) {
          window.location.reload();
          alert(res.data.value.msg);
        }
        else if (res.data.valid == false) {
          window.location.reload();
          alert(res.data.value.msg);
          
        }
        else {
          alert(res);
          console.log(res);
        }
      }
        .bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }
  render() {


    return ((this.state.RedirectState)?(<Navigate to={"/"}></Navigate>):

      <>
        <nav class="navbar navbar-dark bg-primary navbar-expand-lg ">
          <a class="navbar-brand" href="#">USER</a>
          <div class="navbar-nav">
            <NavLink to={"/create_user"} className="nav-item nav-link" activeClassName="active" >Create New</NavLink>
            <NavLink to={"/view_user"} className="nav-item nav-link" activeClassName="active" >View Existing</NavLink>
            <Link class="nav-item nav-link" to={'/signout'}>Logout</Link>
            {/* </div> */}
          </div>
        </nav>
        <body>
          <div className="container-fluid" style={{ height: "90vh" }}>
            <div className="row d-flex justify-content-center align-items-center" style={{ height: "inherit" }}>

              <div className="col-4" >
                <div className="card" >
                  <div className="card-header text-center">
                    <div>Create New User</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.insertUser}>
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <input type="text" name="first_name" ref={(val) => this.first_name = val} className="form-control" placeholder="First Name" required />
                          </div>
                        </div>
                        <div className="col-6 ">
                          <div className="input-group mb-3">
                            <input type="text" name="last_name" ref={(val) => this.last_name = val} className="form-control" placeholder="Last Name" required />
                          </div>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                            <input type="email" name="email" ref={(val) => this.email = val} className="form-control" placeholder="Email" required />
                          </div>
                      <div className="input-group mb-3">
                        <input type="text" name="address" ref={(val) => this.address = val} className="form-control" placeholder="Address" required />
                      </div>
                      <div className="row d-flex justify-content-around">
                        <button type="submit" className="btn btn-primary col-5">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </>
    );

  }
}