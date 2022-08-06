import ControledInput from "../../components/shared/ControledInput";
import { inputFormStep2Rules } from "./inputFormStep2Rules";

const FormStep2 = ({ values, onChange }) => {
	return (
		<>
			{inputFormStep2Rules.map((input) => (
				<ControledInput
					key={input.id}
					{...input}
					value={values[input.name]}
					onChange={onChange}
				/>
			))}
		</>
	);
};

export default FormStep2;
