import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Wrapper, H1, WrapperTop,
  WrapperEditMission, WrapperBottom, WrapperList,
  EditFild, Button, Input,
  Dropdown, Select, WrapperButton,
 } from './StyleIndex';
import ListItem from './ListItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    const listMission = [
      {
      name: 'viec nha',
      detail: '',
      start: '',
      end: '',
      level: 'low'
    }, {
      name: 'viec cty',
      detail: '',
      start: '',
      end: '',
      level: 'high'
    }];
    const currentMissionIndex = -1;
    this.state = {
      currentMissionIndex,
      missionname: currentMissionIndex > -1 ? listMission[currentMissionIndex].name : '',
      detail: currentMissionIndex > -1 ? listMission[currentMissionIndex].detail : '',
      startday: currentMissionIndex > -1 ? listMission[currentMissionIndex].start : '',
      endday: currentMissionIndex > -1 ? listMission[currentMissionIndex].end : '',
      level: currentMissionIndex > -1 ? listMission[currentMissionIndex].level : 'normal',
      listMission,
      error: false,
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDetail = this.handleChangeDetail.bind(this);
    this.dropdownLevel = this.dropdownLevel.bind(this);
    this.renderEditFild = this.renderEditFild.bind(this);
    this.rederEditTime = this.rederEditTime.bind(this);
    this.onClickInsert = this.onClickInsert.bind(this);
    this.loadMission = this.loadMission.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
}
  componentDidMount() {
  }

  onClickInsert() { 
    const { listMission, missionname, detail, startday, endday, level } = this.state;
    if (missionname === '') {
      alert('Error: Name field cannot be left blank');
    } 
    else if (startday.valueOf() > endday.valueOf()) {
      alert('Error: Expiration time is not correct');
    }
    else {
        const count = listMission.push({name: missionname, detail: detail, start: startday, end: endday, level: level});
        console.log("###", count);
      }
    this.setState({listMission});
  }
  onClickUpdate() {
    const { listMission, currentMissionIndex, missionname, detail, startday, endday, level } = this.state;
    const count = listMission.splice(currentMissionIndex, 1, {name: missionname, detail: detail, start: startday, end: endday, level: level});
    this.setState({listMission});
  }
  onClickDelete() {
    const { listMission, currentMissionIndex } = this.state;
    const count = listMission.splice(currentMissionIndex, 1);
    this.setState({listMission});
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({
      missionname: value,
    });
  }

  loadMission(index) {
    let { listMission, currentMissionIndex } = this.state;
    currentMissionIndex = index;
    this.setState({
      currentMissionIndex,
      missionname: currentMissionIndex > -1 ? listMission[currentMissionIndex].name : '',
      detail: currentMissionIndex > -1 ? listMission[currentMissionIndex].detail : '',
      startday: currentMissionIndex > -1 ? listMission[currentMissionIndex].start : '',
      endday: currentMissionIndex > -1 ? listMission[currentMissionIndex].end : '',
      level: currentMissionIndex > -1 ? listMission[currentMissionIndex].level : 'normal',
    })
  }
  
  handleChangeDetail(event) {
    const value = event.target.value;
    this.setState({
      detail: value,
    });
  }
  renderEditFild(span, id, value, onChange, placeholder) {
    return(
      <EditFild>
        <span>{span}</span>
        <Input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </EditFild>
    );
  }
  rederEditTime(span, id, value) {
    return(
      <EditFild>
        <span>{span}</span>
        <input
          id={id}
          type="date"
          value={value}
          onChange={(event) => {
            const state2 = {... this.state };
            state2[id] = event.target.value;
            this.setState(state2)
          }}
        />
      </EditFild>
    );
  }
  dropdownLevel() {
    const { level } = this.state;
    return(
      <Dropdown>
        <span>Priority level :</span>
        <Select 
          width="7em" 
          height="2em" 
          name="level" 
          id="level" 
          value={level}
          onChange={(event) => {
            console.log("event.target.value = ", event.target.value)
            this.setState({ level: event.target.value});
          }}
        >
          <option value={'low'}>low</option>
          <option value={'normal'}>normal</option>
          <option value={'high'}>high</option>
        </Select>
      </Dropdown>
    );
  }
  render() {
    const { 
      missionname, detail, startday,
      endday, listMission 
    } = this.state;
    return(
      <Wrapper>
        <WrapperTop>
            <H1>MISSION</H1>
        </WrapperTop>
        <WrapperBottom>
          <WrapperEditMission>
            <h3>EDIT MISSION</h3>
            {this.renderEditFild('Mission name :','name', missionname, (e) => {this.handleChangeName(e)}, 'mission')}
            {this.renderEditFild('Mission detail :', 'detail', detail, (e) => {this.handleChangeDetail(e)}, 'Detail')}
            {this.rederEditTime('Start :', 'startday', startday)}
            {this.rederEditTime('End :', 'endday', endday)}
            {this.dropdownLevel()}
            <WrapperButton>
              <Button
                onClick={() =>{this.onClickInsert()}}
              >
                Insert
              </Button>
              <Button
                onClick={() => {this.onClickUpdate()}}
              >
                Update
              </Button>
            </WrapperButton>
          </WrapperEditMission>
          <WrapperList>
            <ListItem
              listMission={listMission}
              onClickItem={this.loadMission}
              onClickDelete={this.onClickDelete}
            /> 
          </WrapperList>
        </WrapperBottom>
      </Wrapper>
    )
  }
} 
ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
  );

