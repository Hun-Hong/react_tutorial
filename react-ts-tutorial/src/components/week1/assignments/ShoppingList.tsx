import { useState, useEffect } from "react";

// 1. Item 처럼 대문자로 사용
interface item {
  id: number;
  name: string;
  checked: boolean;
}

function ShoppingList() {

  const [itemList, setItemList] = useState<item[]>([])

  const [inputName, setInputName] = useState("")

  function addItem() {
    if (inputName.trim() === "") return

    setItemList([...itemList,
    { id: Date.now(), name: inputName, checked: false }])

    setInputName("")
  }

  function removeItem(id: number) {
    setItemList(
      itemList.filter(item =>
        item.id !== id
      )
    )
  }
  const [totalItem, setTotalItem] = useState(0)
  const [totalChecked, setTotalChecked] = useState(0)

  // 2. useMemo, useCallback등으로 최적화 가능
  useEffect(()=> {
    setTotalItem(itemList.length)
    setTotalChecked(itemList.filter(
      item => item.checked
    ).length)
  }, [itemList])


  return (
    <div>
      <h1>도전 과제: 간단한 쇼핑 목록</h1>
      <h2>아이템 추가</h2>
      <label htmlFor="item-name"></label>
      {/* 3. Enter키 지원 가능 */}
      <input
        id="item-name"
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)} />
      <button onClick={addItem}>추가하기</button>
      <h2>장바구니</h2>
      <h3>장바구니에 담긴 물건 총 개수 : {totalItem}</h3>
      <h3>구매 완료된 물건 개수 : {totalChecked}</h3>
      {/* 4. 장바구니가 비어있을 경우 안내 */}
      <ul>
        {itemList.map(item => (
          <li
            key={item.id}>
            <span
              style={{ textDecoration: item.checked ? "line-through" : "none" }}>
              {item.name}
            </span>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => setItemList(itemList.map(
                inItem => inItem.id === item.id ? { ...inItem, checked: !inItem.checked } : inItem
              ))} />
            <button
              onClick={() => removeItem(item.id)}>삭제하기</button>
          </li>
        ))}
      </ul>

    </div>
  )


}

export default ShoppingList