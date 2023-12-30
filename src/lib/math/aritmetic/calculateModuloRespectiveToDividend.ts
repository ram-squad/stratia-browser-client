/**
 * Calculates the modulo of the dividend respective to the divisor.
 * The result is signed the same way as the divisor.
 *
 * @example
 * calculateModuloRespectiveToDividend(-1, 3) // 2
 * @example
 * calculateModuloRespectiveToDividend(-2, 3) // 1
 * @example
 * calculateModuloRespectiveToDividend(-3, 3) // 0
 * @example
 * calculateModuloRespectiveToDividend(-4, 3) // 2
 */
export function calculateModuloRespectiveToDividend(dividend: number, divisor: number): number {
	return ((dividend % divisor) + divisor) % divisor;
}
