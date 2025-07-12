type Course = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  viewedAt?: string;
};

export const VIEW_HISTORY_KEY = 'viewHistory';

export const saveToViewHistory = (course: Course): void => {
  try {
    const existingHistory = localStorage.getItem(VIEW_HISTORY_KEY);
    const history: Course[] = existingHistory ? JSON.parse(existingHistory) : [];

    // Kiểm tra xem course đã tồn tại trong lịch sử chưa
    const existingIndex = history.findIndex(item => item.name === course.name);

    if (existingIndex !== -1) {
      return;
    }

    // Thêm course mới vào đầu danh sách
    history.unshift({
      ...course,
      viewedAt: new Date().toISOString()
    });

    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to view history:', error);
  }
};

export const getViewHistory = (): Course[] => {
  try {
    const history = localStorage.getItem(VIEW_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting view history:', error);
    return [];
  }
};

export const clearViewHistory = (): void => {
  try {
    localStorage.removeItem(VIEW_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing view history:', error);
  }
};

export const removeFromViewHistory = (courseName: string): void => {
  try {
    const history = getViewHistory();
    const filteredHistory = history.filter(item => item.name !== courseName);
    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Error removing from view history:', error);
  }
};
