import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
	it.each([
		{ input: 1, expected: '$0.29' },
		{ input: 2, expected: '$0.57' },
		{ input: 20, expected: '$5.71' },
		{ input: 12, expected: '$3.43' },
	])('should return proper value when good input', ({ input, expected }) => {
		expect(convertPLNToUSD(input)).toBe(expected);
	});

	it.each([{ input: '6' }, { input: 'abc' }, { input: '-543' }])(
		'should return NaN when input is text',
		({ input }) => {
			expect(convertPLNToUSD(input)).toBeNaN();
		},
	);

	it('should return NaN then there is no argument', () => {
		expect(convertPLNToUSD('')).toBeNaN();
	});

	it.each([
		{ input: {} },
		{ input: [] },
		{ input: null },
		{ input: function () {} },
	])(
		'should return "Error" when input is different than number and string',
		({ input }) => {
			expect(convertPLNToUSD(input)).toBe('Error');
		},
	);

	it.each([
		{ input: -1, expected: '$0.00' },
		{ input: -2, expected: '$0.00' },
		{ input: -56, expected: '$0.00' },
	])(
		'should return zero when input is lower than zero',
		({ input, expected }) => {
			expect(convertPLNToUSD(input)).toBe(expected);
		},
	);
});
