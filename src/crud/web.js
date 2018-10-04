import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Card, Icon, Image, Grid, Input } from "semantic-ui-react";
import { requestData } from "./redux/actions/req";

class Title extends Component {
   state = {
      searchTerm: ""
   };
   onChangeHandler = e => {
      this.setState({
         searchTerm: e.target.value
      });
   };

   render() {
      const { searchTerm } = this.state;
      const { employees, err, requestData } = this.props;
      return (
         <Fragment>
            {err ? (
               <h2>{err}</h2>
            ) : (
               <Fragment>
                  <div
                     style={{
                        margin: "15px auto",
                        display: "flex",
                        justifyContent: "center"
                     }}
                  >
                     <Button onClick={requestData}>Click To get Data</Button>
                     <Input
                        icon={{ name: "search", circular: true, link: true }}
                        placeholder="Search..."
                        onChange={this.onChangeHandler}
                        value={searchTerm}
                     />
                  </div>
                  <Grid>
                     <Grid.Row>
                        {employees.map(emp => {
                           return (
                              <Grid.Column
                                 key={emp.id}
                                 mobile={8}
                                 tablet={4}
                                 computer={4}
                              >
                                 <Card>
                                    <Image src={emp.img} />
                                    <Card.Content>
                                       <Card.Header>
                                          {`${emp.first_name} ${
                                             emp.first_name
                                          }`}
                                       </Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                       <a>
                                          <Icon name="user" />
                                          {emp.gender}
                                       </a>
                                    </Card.Content>
                                 </Card>
                              </Grid.Column>
                           );
                        })}
                     </Grid.Row>
                  </Grid>
               </Fragment>
            )}
         </Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      employees: state.employees.empdata,
      err: state.errdata
   };
};

export default connect(
   mapStateToProps,
   { requestData }
)(Title);
