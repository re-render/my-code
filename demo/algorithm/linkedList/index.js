// 链表和数组都是线性解构
//  但是数组是连续的内存空间，但是链表有可能不是连续的

//  1.单向链表
//  2.双向链表
//  3.单向循环链表，最后一个元素指向第一个元素，构成一个环
//  4.双向循环链表
//  5.环形链表，任意两个元素形成一个闭合环

//  树是基于链表实现的

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.header = null;
    this.size = 0;//相当于数组的length
  }
  //默认往最后添加元素
  append(element) {
    let node = new Node(element);
    //首次插入 判断链表是否为空
    if (this.header === null) {
      this.header = node;
    } else { //如果向最后一位插入 那么找到最后一位
      let lastCurrent = this.getCurrent(this.size - 1);
      lastCurrent.next = node;
    }

    this.size++;

  }
  //指定位置插入元素
  appendAt(position, element) {
    if (position < 0 || position > this.size) {
      throw new RangeError('node position out range');
    }
    //找到之前的元素，让之前的next指向我当前元素，让当前的元素指向下一个元素
    //边界：1.插入第一个，也就是header 2.插入最后一个
    let node = new Node(element);

    if (position === 0) {
      node.next = this.header;
      this.header = node;
    } else {
      let frontCurrent = this.getCurrent(position - 2),
        beforeCurrent = this.getCurrent(position - 1);

      frontCurrent.next = node;
      node.next = beforeCurrent;
    }

    this.size++;
  }
  //查找
  indexOf(element) {
    let num = 0,
      node = this.header;

    while (num < this.size) {
      if (node.element === element) {
        break;
      }
      node = node.next;
      num++;
    }

    if (!node || node.element !== element) {
      throw new Error('not found target element');
    }

    return num;
  }
  //删除
  removeAt(position) {
    if (position === 0) {
      this.header = this.header.next;
    } else {
      let prev = this.getCurrent(position - 2),
        before = this.getCurrent(position - 1).next;

      prev.next = before;
    }

    this.size--;
  }
  //链表的反转
  reverse() {
    // if (this.header === null || this.header.next === null) return this.header;

    // let newHeader = null,
    //   header = this.header,
    //   times = this.size;

    // while (times > 0) {
    //   let temp = header.next;
    //   header.next = newHeader;
    //   newHeader = header;
    //   // console.log(newHeader)
    //   header = temp;
    //   // break;
    //   times--;
    // }
    // // console.log(newHeader)
    // this.header = newHeader;

    const reverse = header => {
      if (header === null || header.next === null) return header;

      let current = reverse(header.next);

      header.next.next = header;
      header.next = null;

      return current;

    }

    this.header = reverse(this.header);

    return this.header;


  }

  getCurrent(index) {
    if (index < 0 || index > this.size - 1) {
      throw new RangeError('out range');
    }

    let node = this.header;

    while (index) {
      node = node.next;
      index--;
    }

    return node;
  }

  clear() {
    this.header = null;
    this.size = null;
  }
}

var ll = new LinkedList();

ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
// ll.appendAt(2, { a: 1 });
// ll.appendAt(5, 999);
// ll.removeAt(6);
console.log(ll);
ll.reverse();


console.log(ll);
// console.log(ll.indexOf(4));