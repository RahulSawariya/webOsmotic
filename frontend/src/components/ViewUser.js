import React from "react";
import Axios from 'axios';
import {Link,Navigate,NavLink} from 'react-router-dom';
import $ from "jquery";
import dt from 'datatables.net-responsive-dt';
import Modal from 'react-modal'

export default class ViewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RedirectState: false,
      server: '',
      ExistingUsers:[],
      modelIsOpenForEdit:false,
      modelIsOpenForDelete:false,
      modelIsOpenForResponse:false,
      user:'',
      first_name:'',
      last_name:'',
      email:'',
      address:'',
      response:'',
    }
  }

  componentDidMount() {
    const server = window.$name;
    this.setState({ server: server });
    let value = localStorage.getItem('token');
    // alert(value); 
    if(value==null){
        this.setState({RedirectState:true});
        this.state.RedirectState = true;
        // alert(this.state.RedirectState);
    }

    Axios.post(window.$name + 'ViewUserController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
      })
      .then(function (res) {
        if (res.data.valid == true) {
          console.log(res.data.value.users);
          this.setState({ExistingUsers:res.data.value.users});
          var dataTable = $('#table').DataTable({
            responsive: true,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //debugger;
                var index = iDisplayIndexFull + 1;
                $("td:first", nRow).html(index);
                return nRow;
            },
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },
                { responsivePriority: 1, targets: -1 },
                { responsivePriority: 2, targets: 1 },
                { responsivePriority: 3, targets: 0 }
            ]
        });
        $("#searchbox").on("keyup search input paste cut", function () {
            dataTable.search(this.value).draw();
        });
        }
        else if (res.data.valid == false) {
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

  FillForm = (data) =>{
    this.setState({
      user:data.id,
      first_name:data.first_name,
      last_name:data.last_name,
      email:data.email,
      address:data.address,
      modelIsOpenForEdit:true});
  }

  EditUser = (event) => {
    // alert(this.state.user_id);
    event.preventDefault();
    event.persist();
    Axios.post(this.state.server + 'EditUserController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        user: this.state.user,
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        address: this.address.value
      })
      .then(function (res) {
        if (res.data.valid == true) {
          // window.location.reload();
          // alert(res.data.value.msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
        }
        else if (res.data.valid == false) {
          // window.location.reload();
          // alert(res.data.value.Msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
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

  DeleteUser = () => {
    // alert(this.state.user);
    // event.preventDefault();
    // event.persist();
    Axios.post(this.state.server + 'DeleteUserController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        user: this.state.user,
      })
      .then(function (res) {
        if (res.data.valid == true) {
          // window.location.reload();
          // alert(res.data.value.msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
        }
        else if (res.data.valid == false) {
          // window.location.reload();
          // alert(res.data.value.Msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
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
     
          <div className="container-fluid" style={{height:"100vh"}}>
            <div className="row d-flex justify-content-center align-items-center" style={{height:"100%"}}>
            
              <div className="col-10" >
                <div className="card" style={{height:"90vh"}}>
                  <div className="card-header text-center">
                    <div>Exisiting Users</div>
                  </div>
                  <div className="card-body" style={{overflow:"auto"}}>
                  <table id="table" class="table table-hover">
  <thead style={{position:"sticky",top:"-16px",background:"white"}}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full Name</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {this.state.ExistingUsers.map((data) =>
    <tr>
      <td></td>
      <td>{data.first_name +" "+ data.last_name}</td>
      <td>{data.email}</td>
      <td>{data.address}</td>
      <td className="d-flex justify-content-around">
        <button className="btn btn-primary" title="Edit" onClick={()=>this.FillForm(data)}><i class="far fa-edit"></i></button>
      <button className="btn btn-danger" title="Delete" onClick={()=>this.setState({modelIsOpenForDelete:true,user:data.id})}><i class="far fa-trash-alt"></i></button></td>
    </tr>
  )}
  </tbody>
</table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>

        <Modal isOpen={this.state.modelIsOpenForEdit} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForEdit: false })}>
        <span class="closed" type="button" style={{ fontSize: "32px", position: "absolute", zIndex: "1", right: "3%", height: "6.7vh", lineHeight: "6.7vh" }} onClick={() => this.setState({ modelIsOpenForEdit: false })}>&times;</span>                    
        <div className="card" >
                  <div className="card-header text-center">
                    <div>Create New User</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.EditUser}>
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.first_name} type="text" name="first_name" ref={(val) => this.first_name = val} className="form-control" placeholder="First Name" required />
                          </div>
                        </div>
                        <div className="col-6 ">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.last_name} type="text" name="last_name" ref={(val) => this.last_name = val} className="form-control" placeholder="Last Name" required />
                          </div>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                            <input defaultValue={this.state.email} type="email" name="email" ref={(val) => this.email = val} className="form-control" placeholder="Email" required />
                          </div>
                      <div className="input-group mb-3">
                        <input defaultValue={this.state.address} type="text" name="address" ref={(val) => this.address = val} className="form-control" placeholder="Address" required />
                      </div>
                      <div className="row d-flex justify-content-around">
                        <button type="submit" className="btn btn-primary col-5">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
        </Modal>

        <Modal isOpen={this.state.modelIsOpenForDelete} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForDelete: false })}>
        <span class="closed" type="button" style={{ fontSize: "32px", position: "absolute", zIndex: "1", right: "3%", height: "6.7vh", lineHeight: "6.7vh" }} onClick={() => this.setState({ modelIsOpenForDelete: false })}>&times;</span>                    
        <div className="card" >
                  <div className="card-header text-center">
                    <div>Are you sure ?</div>
                  </div>
                  <div className="card-body text-center">
                    <button onClick={()=>this.DeleteUser()} className="btn btn-danger col-5" >Submit</button>
                  </div>
                </div>
        </Modal>

        <Modal isOpen={this.state.modelIsOpenForResponse} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForResponse: false })}>
        <div className="card" >
                  <div className="card-header text-center">
                    <div>{this.state.response}</div>
                  </div>
                  <div className="card-body text-center">
                    <button className="btn btn-danger col-5" onClick={()=>{this.setState({modelIsOpenForResponse:false});window.location.reload();}}>OK</button>
                  </div>
                </div>
        </Modal>
      </>
    );
      
  }
}