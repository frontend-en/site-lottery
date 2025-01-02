/**
 * Сервис для отслеживания количества вращений колеса
 * и определения выигрышных вращений
 */
class SpinTracker {
  // Единственный экземпляр класса (паттерн Singleton)
  private static instance: SpinTracker;
  
  // Счетчик вращений
  private spinCount: number = 0;
  
  // Каждое 2-е вращение будет выигрышным
  private readonly SPINS_PER_WIN = 2;

  // Приватный конструктор для паттерна Singleton
  private constructor() {}

  /**
   * Получить экземпляр класса SpinTracker
   * @returns Единственный экземпляр SpinTracker
   */
  public static getInstance(): SpinTracker {
    if (!SpinTracker.instance) {
      SpinTracker.instance = new SpinTracker();
    }

    return SpinTracker.instance;
  }

  /**
   * Зафиксировать новое вращение и проверить, является ли оно выигрышным
   * @returns true если это 2-е вращение (выигрышное), false в противном случае
   */
  public spin(): boolean {
    this.spinCount++;

    return this.spinCount % this.SPINS_PER_WIN === 0;
  }

  /**
   * Сбросить счетчик вращений
   */
  public reset(): void {
    this.spinCount = 0;
  }
}

// Экспортируем единственный экземпляр класса
export const spinTracker = SpinTracker.getInstance();
