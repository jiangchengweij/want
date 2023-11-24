const MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

export function useTouch() {

	const touchVar = {
		direction: null,
		startX: 0, startY: 0,
		deltaX: 0, deltaY: 0,
		offsetX: 0, offsetY: 0
	}

	
	const resetTouchStatus = () => {
		touchVar.direction = null;
		touchVar.deltaX = 0;
		touchVar.deltaY = 0;
		touchVar.offsetX = 0;
		touchVar.offsetY = 0;
	}
	
	const touchStart = (event) => {
		resetTouchStatus();
		const touch = event.touches[0];
		touchVar.startX = touch.clientX;
		touchVar.startY = touch.clientY;
	}
	
	const touchMove = (event) => {
		const touch = event.touches[0];
		touchVar.deltaX = touch.clientX - touchVar.startX;
		touchVar.deltaY = touch.clientY - touchVar.startY;
		touchVar.offsetX = Math.abs(touchVar.deltaX);
		touchVar.offsetY = Math.abs(touchVar.deltaY);
		touchVar.direction = touchVar.direction || getDirection(touchVar.offsetX, touchVar.offsetY);
	}
	
	return { resetTouchStatus, touchStart, touchMove, touchVar }
}
