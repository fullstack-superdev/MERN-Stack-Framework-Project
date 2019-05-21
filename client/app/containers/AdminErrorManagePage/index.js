/**
 *
 * AdminErrorManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import { Paper, Divider } from '@material-ui/core';
import CustomInput from '@material-ui/core/Input';

// core components
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

const styles = theme => ({});

/* eslint-disable react/prefer-stateless-function */
export class AdminErrorManagePage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleDelete = id => {};

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({
        error_message,
        error_stack,
        error_type,
        added_at,
        is_published,
        is_active,
        tags,
        author,
        _id,
      }) => [
        error_message,
        error_stack,
        error_type,
        moment(added_at).format('MMM Do YY'),
        <React.Fragment>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleDelete(_id)}
            >
              <Close
                className={`${classes.tableActionButtonIcon} ${classes.close}`}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>,
      ],
    );
    return (
      <>
        <PageHeader>Error Manage</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <CustomInput
              name="find_errors"
              id="error-message"
              fullWidth
              placeholder="Search Errors"
              value={query.find_errors}
              onChange={this.handleQueryChange}
            />
            <Divider
              style={{
                width: 1,
                height: 40,
                margin: 4,
              }}
            />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />
          <Paper
            style={{
              padding: 0,
              overflow: 'auto',
              borderRadius: 4,
              boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
              display: 'flex',
            }}
            elevation={0}
          />
          <Table
            tableHead={[
              'Error Message',
              'Error Stack',
              'Error Type',
              'Added At',
              'Actions',
              '',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminErrorManagePage', reducer });
const withSaga = injectSaga({ key: 'adminErrorManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminErrorManagePage);