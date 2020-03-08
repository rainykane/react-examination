import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';

/**
 * 分页组件
 */
class Pagination extends Component {
  render() {
    const { page } = this.props
    const { pageNum, pageNumArr} = this.state

    return (
      <div className={styles.pagination}>
        { page > 1 && (
          <div 
            className={`btn btn-default ${styles.pageItem}`}
            onClick={this.handlePrePage.bind(this)}>{'<'}</div>
        )}
        {pageNumArr.map( (item, index) => {
            return (
              <div 
                className={`btn btn-default ${styles.pageItem} ${page === item ? styles.pageItemActive : ''}`}
                key={index}
                onClick={this.handlePageChange.bind(this, item)}>{item}</div>
            )
        })}
        { page < pageNum && (
          <div 
            className={`btn btn-default ${styles.pageItem}`}
            onClick={this.handleNextPage.bind(this)}>{'>'}</div>
        )}
      </div>
    );
  }

  constructor (props) {
    super(props)
    this.state = {
      pageNum: 0,   // 总页数
      pageNumArr : []   // 页码的数组
    }
  }

  componentDidMount () {
    const { page, pageSize, total } = this.props
    // 总页数
    const pageNum = this.updatePageNum(pageSize, total)
    this.updatePageNumArr(page, pageNum) 
  }

  componentDidUpdate(preProps, preState) {
    if(preProps.page !== this.props.page) {
      this.updatePageNumArr(this.props.page, this.state.pageNum)
    }
  }

  // 更新 总页数 -- pageSize可变的情况下可用
  updatePageNum (pageSize, total) {
    const pageNum = parseInt(total % pageSize === 0 ? total / pageSize : total / pageSize + 1)
    this.setState({
      pageNum
    })
    return pageNum
  }

  // 获取底部翻页的页码数组
  updatePageNumArr (page, pageNum) {
    let start = 1, end = 6
    if( page > 4 && pageNum - page >= 2) {
      start += page - 4
      end += page -4
    }else if ( pageNum - page < 2) {
      start = pageNum - 6
      end = pageNum
    }
    let pageNumArr = []
    for (let i = start; i <= end; i++) {
      pageNumArr.push(i)
    }
    this.setState({
      pageNumArr
    })
    return pageNumArr
  }

  handlePrePage () {
    this.props.onSetPage(this.props.page - 1)
  }

  handlePageChange (page) {
    this.props.onSetPage(page)
  }

  handleNextPage () {
    this.props.onSetPage(this.props.page + 1)
  }
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onSetPage: PropTypes.func.isRequired
};

export default Pagination;
