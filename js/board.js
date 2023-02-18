document.addEventListener('DOMContentLoaded', e => {
  const list = document.querySelector('.list-wrapper')
  let pointerDown = false
  let shiftX = 0
  let shiftY = 0

  window.addEventListener(
    'pointerdown',
    ({ clientX, clientY, pageX, pageY, target }) => {
      const card = target.closest('.card')
      if (!card) return

      const cloneCard = card.cloneNode(true)
      cloneCard.classList.add('dragging')
      const ghost = document.querySelector('.ghost')
      ghost.appendChild(cloneCard)

      shiftX = clientX - card.getBoundingClientRect().left
      shiftY = clientY - card.getBoundingClientRect().top

      ghost.style.cssText = `width: ${
        card.offsetWidth
      }px; transform: translateX(${pageX - shiftX}px) translateY(${
        pageY - shiftY
      }px)`

      pointerDown = true
      card.classList.add('afterimage')
    }
  )

  window.addEventListener(
    'pointermove',
    ({ clientX, clientY, pageX, pageY, target }) => {
      if (!pointerDown) {
        return
      }

      const ghost = document.querySelector('.ghost')
      ghost.hidden = true
      const pointedEl = document.elementFromPoint(clientX, clientY)
      const closestCard = pointedEl.closest('.card')
      const column = pointedEl.closest('.column')
      ghost.hidden = false

      ghost.style.cssText = `width: ${
        ghost.offsetWidth
      }px; transform: translateX(${pageX - shiftX}px) translateY(${
        pageY - shiftY
      }px)`

      if (!column) {
        return
      }

      // 쥐고 있는 카드 복사
      const placeCard = ghost.firstChild.cloneNode(true)
      placeCard.classList.replace('dragging', 'afterimage')
      const fromCard = document.querySelector('.afterimage')

      if (closestCard) {
        if (closestCard.classList.contains('afterimage')) {
          return
        }

        closestCard.before(placeCard)
      } else {
        const cardWrapper = column.querySelector('.card-wrapper')
        cardWrapper.appendChild(placeCard)
      }

      fromCard.remove()
    }
  )

  window.addEventListener('pointerup', e => {
    if (!pointerDown) {
      return
    }

    pointerDown = false

    const ghost = document.querySelector('.ghost')
    ghost.innerHTML = ''

    const activeCard = document.querySelector('.afterimage')
    activeCard.classList.remove('afterimage')
  })
})
