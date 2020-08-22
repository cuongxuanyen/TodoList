import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const icon = require('./img/iconxoa.png');

const WrapperMission = styled.div`
  cursor: pointer;
  padding: 2px 2px 2px 2px;
  width: auto;
  height: auto;
  border-style: groove;
  padding-bottom: 5px;
  display: flex;
  margin-bottom: 7px;
  justify-content: space-between;
`;
const Button = styled.button`
`;

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      listmission: [],
    }
    this.renderMission = this.renderMission.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  renderMission(e, index) {
    const { onClickItem, onClickDelete } = this.props;
    return (
      <li key={index}>
        <WrapperMission onClick={() => onClickItem(index)}>
            <div>
              {e.name}
            </div>
            <img
              id="img"
              src={icon}
              onClick={() => onClickDelete()}
            />
        </WrapperMission>
      </li>
    );
  }

  handleChangeSearch(e) {

    const updatedList = this.props.listMission.filter(item => {
      return (item.name).toString().toLowerCase().search(e.target.value.toString().toLowerCase()) !== -1;
    });
    this.setState({
      listmission: updatedList,
    });
  }
  onClickSearch() {
    const { listMission } = this.props;
    this.setState({
      listmission: listMission,
      search: true,
    });
  }

  render() {
    const listItems = this.state.listmission.map((e, index) => (
      this.renderMission(e, index)
    ));
    const list = this.props.listMission.map((e, index) => (
      this.renderMission(e, index)
    ));
    return(
      <div>
        <h3>LIST MISSION</h3>
        <input
          id="search"
          width="auto"
          type="text"
          onChange={(e) => {this.handleChangeSearch(e)}}
          onClick={() => {this.onClickSearch()}}
          placeholder="Search"
        />
        <ul>
          {this.state.search ? listItems : list}
        </ul>
      </div>
    );
  }
}
ListItem.defaultProps = {
  listMission: [],
}
ListItem.propTypes = {
  listMission: PropTypes.arrayOf(PropTypes.any),
  onClickItem: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
}

export default ListItem;
