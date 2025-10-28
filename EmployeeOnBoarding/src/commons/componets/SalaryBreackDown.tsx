import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

interface SalaryBreackDownProbs {
    salary: number
}

const SalaryBreackDown: React.FC<SalaryBreackDownProbs> = ({ salary }) => {


    const [montlyGross, setMontlyGross] = useState<number>(0);
    const [basicPay, setBasicPay] = useState<number>(0);
    const [pf, setpf] = useState<number>(0);
    const [allowances, setallowenes] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [monthlySalary, setMonthlySalary] = useState<number>(0);

    useEffect(() => {
        const monthlyGross: number = salary / 12;
        const basicPay: number = monthlyGross * 0.7;
        const pfAmount: number = basicPay * 0.13;
        const otherAllowance: number = monthlyGross - (basicPay + pfAmount);
        let taxAmount: number = 0;

        if (salary <= 500000) {
            taxAmount = 0;
        }
        else if (salary > 500000 && salary <= 1000000) {
            
            taxAmount = (salary - 500000) * 0.1;
        }
        else if (salary > 1000000) {
            const taxFor5to10L = 500000 * 0.1;
            const taxAbove10L = (salary - 1000000) * 0.2;
            taxAmount = taxFor5to10L + taxAbove10L;
        }

        const monthlyTaxAmount: number = taxAmount / 12;
        const netMonthlySalary = monthlyGross - (pfAmount + monthlyTaxAmount);

        setTax(monthlyTaxAmount);
        setMontlyGross(monthlyGross);
        setBasicPay(basicPay);
        setpf(pfAmount);
        setallowenes(otherAllowance);
        setMonthlySalary(netMonthlySalary);

    }, [salary]);


    return (
        <div>
            <Card className="shadow-sm p-4 border-0 bg-light h-100 d-flex justify-content-center align-items-center text-center">
                <h4 className=" text-center text-danger">Monthly Salary Breakdown</h4>
                <Table className="table table-bordered table-striped table-hover align-middle text-center shadow-sm rounded p-4">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Monthly Gross
                            </td>
                            <td>
                                {montlyGross.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Basic Pay - 70%
                            </td>
                            <td>
                                {basicPay.toFixed(2)}
                            </td>
                        </tr><tr>
                            <td>
                                Pf - 13% of Basic
                            </td>
                            <td>
                                {pf.toFixed(2)}
                            </td>
                        </tr><tr>
                            <td>
                                Other Allowances
                            </td>
                            <td>
                                {allowances.toFixed(2)}
                            </td>
                        </tr><tr>
                            <td>
                                Monthly Tax
                            </td>
                            <td>
                                {tax.toFixed(2)}
                            </td>
                        </tr><tr>
                            <td className=" fw-bold text-dark">
                                Net Monthly Salary
                            </td>
                            <td>
                                {monthlySalary.toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}

export default React.memo(SalaryBreackDown);