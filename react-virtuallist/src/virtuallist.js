import React, { PureComponent, Component } from 'react'
class Item1 extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.cacheOffset(this.node, this.props.index)

  }

  render() {
    const { index, data } = this.props
    return (
      <div className='list-item' ref={node=>this.node=node}>
        <span>{index}.{data}</span>
        <span>{index}测试数据</span>
      </div>
    )
  }
}


export default class Virtuallist extends PureComponent {
  constructor(props) {
    super(props)
    this.height = 50  // 单个元素的固定高度
    this.start = 0 //页面上开始元素的index
    this.end = 0 //
    this.state = {
      countData: [],
      topOffset: 0,  // 为了使滚动条看起来正常的一点
      btmOffset: 0
    }
    this.vData = new Array(500).fill('kkb')

    this.cache = []
    this.anchor = {  // 锚点，可见页面开始的标志
      index: 0,
      top: 0,
      bottom: 0
    }
  }

  //缓存子元素的位置信息，以免重复计算
  cacheOffset = (node, index) => {
    const rect = node.getBoundingClientRect();
    const top = rect.top + window.pageYOffset
    this.cache.push({
      index,
      top: top,
      bottom: top+this.height
    })
    console.log('cache',this.cache)
  }
  componentDidMount() {
    this.count = Math.ceil(window.innerHeight/this.height)
    this.end = this.start + this.count

    this.updateView() 
    window.addEventListener('scroll', this.handleScroll,false)
  }

  handleScroll = () => {
    const scrollTop = window.scrollY
    console.log('scrollTop', scrollTop)
    this.updateIndex(scrollTop)
    this.updateView()
    this.scrollTop = scrollTop

  }
  // 获取开始元素的索引
  updateIndex(scrollTop) {
    const anchor = this.cache.find(item=>item.bottom>=scrollTop)
    console.log('cache',this.cache, anchor)
    this.anchor = {...anchor}
    this.start = this.anchor.index
    this.end = this.start + this.count
  }

  // 计算可视区域可以显示的图片数量
  updateView() {
    console.log('start',this.start,this.end)
    const countData = this.vData.slice(this.start, this.end)
    console.log('countData',countData)
    this.setState({
      topOffset:this.anchor.top,
      btmOffset:(this.vData.length-this.end)*this.height,
      countData,
    })
  } 


  render() {
    const { countData, btmOffset,topOffset } = this.state;
    console.log('countData', countData)
    return (
      <div className='virtual-wrapper' style={{paddingTop:`${topOffset}px`,paddingBottom:`${btmOffset}px`}}>
        {countData.map((data, index) =>
          <Item1 key={index} data={data} index={this.start+index} cacheOffset={this.cacheOffset}></Item1>
        )}
      </div>
    )
  }
}
