import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(<ResultBox from='PLN' to='USD' amount={235} />);
	});

	it.each([
		{ amount: 123, expected: 'PLN 123.00 = $35.14' },
		{ amount: 555, expected: 'PLN 555.00 = $158.57' },
		{ amount: 11, expected: 'PLN 11.00 = $3.14' },
		{ amount: 5262, expected: 'PLN 5,262.00 = $1,503.43' },
		{ amount: 12, expected: 'PLN 12.00 = $3.43' },
	])(
		'should render proper info about conversion when PLN -> USD',
		({ amount, expected }) => {
			render(<ResultBox from='PLN' to='USD' amount={amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(expected);
		},
	);
	it.each([
		{ amount: 123, expected: '$123.00 = PLN 430.50' },
		{ amount: 555, expected: '$555.00 = PLN 1,942.50' },
		{ amount: 11, expected: '$11.00 = PLN 38.50' },
		{ amount: 5262, expected: '$5,262.00 = PLN 18,417.00' },
		{ amount: 12, expected: '$12.00 = PLN 42.00' },
	])(
		'should render proper info about conversion when USD -> PLN',
		({ amount, expected }) => {
			render(<ResultBox from='USD' to='PLN' amount={amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(expected);
		},
	);
	it.each([
		{ amount: 100, expected: 'PLN 100.00 = PLN 100.00' },
		{ amount: 50, expected: 'PLN 50.00 = PLN 50.00' },
	])(
		'should render the same values for the same source and target currency',
		({ amount, expected }) => {
			render(<ResultBox from='PLN' to='PLN' amount={amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(expected);
		},
	);
	it('should render "Wrong value…" for negative amount', () => {
		render(<ResultBox from='PLN' to='USD' amount={-1} />);
		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('Wrong value…');
	});
});
