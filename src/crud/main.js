import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import {
   Button,
   Card,
   Icon,
   Image,
   Grid,
   Input,
   Modal,
   Header
} from "semantic-ui-react";
import { requestData, deleteEmployee, editEmployee } from "./redux/actions/req";

class Main extends PureComponent {
   state = {
      searchTerm: "",
      open: false,
      first_name: "",
      last_name: "",
      selectedEmp: {}
   };

   toggleModal = () => {
      this.setState(prevState => ({
         open: !prevState.open
      }));
   };

   handleSearchTermChange = e => {
      this.setState({
         searchTerm: e.target.value
      });
   };

   handleFirstNameChange = e => {
      this.setState({
         first_name: e.target.value
      });
   };
   handleLastNameChange = e => {
      this.setState({
         last_name: e.target.value
      });
   };

   handleDeleteEmployee = id => {
      this.props.deleteEmployee(id);
   };

   handleEditEmployee = id => {
      const foundEmp = this.props.employees.find(emp => emp.id === id);
      this.setState(
         prevState => ({
            selectedEmp: foundEmp
         }),
         () => {
            this.toggleModal();
         }
      );
   };

   handleSubmitUpdateEmployee = () => {
      const { selectedEmp, first_name, last_name } = this.state;
      const param = {
         selectedEmp,
         first_name,
         last_name
      };
      this.props.editEmployee(param);
      this.setState(
         () => ({
            first_name: "",
            last_name: ""
         }),
         () => {
            this.toggleModal();
         }
      );
   };

   render() {
      return (
         <Fragment>
            <Button onClick={this.props.requestData}>Click Me</Button>
            <Input
               value={this.state.searchTerm}
               onChange={this.handleSearchTermChange}
            />

            <Modal basic size="small" open={this.state.open}>
               <Header icon="archive" content="Edit Your Name" />

               <Modal.Content>
                  <h3>First Name</h3>
                  <Input
                     value={this.state.first_name}
                     onChange={this.handleFirstNameChange}
                  />
                  <h3>Last Name</h3>
                  <Input
                     value={this.state.last_name}
                     onChange={this.handleLastNameChange}
                  />
               </Modal.Content>
               <Modal.Actions>
                  <Button basic color="red" inverted onClick={this.toggleModal}>
                     <Icon name="remove" /> No
                  </Button>
                  <Button
                     color="green"
                     inverted
                     onClick={this.handleSubmitUpdateEmployee}
                  >
                     <Icon name="checkmark" /> Yes
                  </Button>
               </Modal.Actions>
            </Modal>

            <Grid>
               <Grid.Row>
                  {this.props.employees
                     .filter(emp =>
                        emp.first_name
                           .toLowerCase()
                           .includes(this.state.searchTerm.toLowerCase())
                     )
                     .map(emp => (
                        <Grid.Column
                           key={emp.id}
                           mobile={16}
                           tablet={8}
                           computer={4}
                        >
                           <Card style={{ margin: "10px" }}>
                              <Image src={emp.img} />
                              <Card.Content>
                                 <Card.Header style={{ margin: "0 0 20px 0" }}>
                                    {`${emp.first_name} ${emp.last_name}`}
                                 </Card.Header>
                                 <div>
                                    <Icon
                                       style={{
                                          margin: "0 10px 0 0"
                                       }}
                                       name="delete"
                                       size="big"
                                       color="red"
                                       onClick={() =>
                                          this.handleDeleteEmployee(emp.id)
                                       }
                                    />
                                    <Icon
                                       name="edit"
                                       size="big"
                                       color="green"
                                       onClick={() =>
                                          this.handleEditEmployee(emp.id)
                                       }
                                    />
                                 </div>
                              </Card.Content>
                           </Card>
                        </Grid.Column>
                     ))}
               </Grid.Row>
            </Grid>
         </Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      employees: state.employees.empdata
   };
};

export default connect(
   mapStateToProps,
   { requestData, deleteEmployee, editEmployee }
)(Main);
