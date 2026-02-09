import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(<ResultBox from='PLN' to='USD' amount={235} />);
	});

	const testCases = [
		{ amount: 123 },
		{ amount: 555 },
		{ amount: 11 },
		{ amount: 5262 },
		{ amount: 12 },
	];
	const exchangeRate = 3.5;
	for (const testCase of testCases) {
		it('should render proper info about conversion when PLN -> USD', () => {
			render(<ResultBox from='PLN' to='USD' amount={testCase.amount} />);
			const output = screen.getByTestId('output');
			const formattedAmount = testCase.amount.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
			const expectedUSD = (testCase.amount / exchangeRate).toLocaleString(
				'en-US',
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			);
			expect(output).toHaveTextContent(
				`PLN ${formattedAmount} = $${expectedUSD}`,
			);
		});
	}
	for (const testCasePLN of testCases) {
		it(`should render proper info about conversion when USD -> PLN for amount ${testCasePLN.amount}`, () => {
			render(<ResultBox from='USD' to='PLN' amount={testCasePLN.amount} />);
			const output = screen.getByTestId('output');
			const formattedAmount = testCasePLN.amount.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
			const expectedPLN = (testCasePLN.amount * exchangeRate).toLocaleString(
				'en-US',
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			);
			expect(output).toHaveTextContent(
				`$${formattedAmount} = PLN ${expectedPLN}`,
			);
		});
	}
	const sameCurrencyTestCases = [{ amount: 100 }, { amount: 50 }];

	for (const testCase of sameCurrencyTestCases) {
		it(`should render the same values for the same source and target currency for ${testCase.currency}`, () => {
			render(<ResultBox from='PLN' to='PLN' amount={testCase.amount} />);
			const output = screen.getByTestId('output');
			expect(output).toHaveTextContent(
				`PLN ${testCase.amount.toFixed(2)} = PLN ${testCase.amount.toFixed(2)}`,
			);
		});
	}
	it('should render "Wrong value…" for negative amount', () => {
		render(<ResultBox from='PLN' to='USD' amount={-1} />);
		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('Wrong value…');
	});
});
