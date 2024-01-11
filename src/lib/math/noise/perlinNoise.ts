// Function to linearly interpolate between a0 and a1
// Weight w should be in the range [0.0, 1.0]
function interpolate(a0: number, a1: number, w: number): number {
	// You may want clamping by inserting:
	// if (0.0 > w) return a0;
	// if (1.0 < w) return a1;
	return (a1 - a0) * w + a0;
	// Use this cubic interpolation [[Smoothstep]] instead, for a smooth appearance:
	// return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
	// Use [[Smootherstep]] for an even smoother result with a second derivative equal to zero on boundaries:
	// return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
}

// Create pseudorandom direction vector
function randomGradient(ix: number, iy: number): {x: number; y: number} {
	// No precomputed gradients mean this works for any number of grid coordinates
	const w = 8 * 32; // assuming 32-bit unsigned integers
	const s = w / 2; // rotation width
	let a = ix,
		b = iy;
	a *= 3284157443;
	b ^= (a << s) | (a >>> (w - s));
	b *= 1911520717;
	a ^= (b << s) | (b >>> (w - s));
	a *= 2048419325;
	const random = a * (Math.PI / ~(~~0 >>> 1)); // in [0, 2*Pi]
	return {x: Math.cos(random), y: Math.sin(random)};
}

// Computes the dot product of the distance and gradient vectors.
function dotGridGradient(ix: number, iy: number, x: number, y: number): number {
	// Get gradient from integer coordinates
	const gradient = randomGradient(ix, iy);

	// Compute the distance vector
	const dx = x - ix;
	const dy = y - iy;

	// Compute the dot-product
	return dx * gradient.x + dy * gradient.y;
}

// Compute Perlin noise at coordinates x, y
export function generatePerlinNoise(x: number, y: number): number {
	// Determine grid cell coordinates
	const x0 = Math.floor(x);
	const x1 = x0 + 1;
	const y0 = Math.floor(y);
	const y1 = y0 + 1;

	// Determine interpolation weights
	// Could also use higher order polynomial/s-curve here
	const sx = x - x0;
	const sy = y - y0;

	// Interpolate between grid point gradients
	let n0, n1, ix0, ix1, value;

	n0 = dotGridGradient(x0, y0, x, y);
	n1 = dotGridGradient(x1, y0, x, y);
	ix0 = interpolate(n0, n1, sx);

	n0 = dotGridGradient(x0, y1, x, y);
	n1 = dotGridGradient(x1, y1, x, y);
	ix1 = interpolate(n0, n1, sx);

	value = interpolate(ix0, ix1, sy);
	return value; // Will return in range -1 to 1. To make it in range 0 to 1, multiply by 0.5 and add 0.5
}
