import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./components/input";
import Button from "./components/button";
import Container from "./components/container";
import Section from "./components/section";
import Balance from "./components/balance";

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function App() {
  const [balance, setBalance] = useState("");
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setBalance(val);
  };
  const RequiredMessage = "Obligatorio";
  const ConstraintMessage = "Debe ser un número";
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{ deposit: "", contribution: "", years: "", rate: "" }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required(RequiredMessage)
              .typeError(ConstraintMessage),
            contribution: Yup.number()
              .required(RequiredMessage)
              .typeError(ConstraintMessage),
            years: Yup.number()
              .required(RequiredMessage)
              .typeError(ConstraintMessage),
            rate: Yup.number()
              .required(RequiredMessage)
              .typeError(ConstraintMessage)
              .min(0, "El valor mínimo es 0")
              .max(1, "El valor máximo es 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== "" ? (
          <Balance>Balance final: {formatter.format(balance)}</Balance>
        ) : null}
      </Section>
    </Container>
  );
}

export default App;
