import ControledInput from "../../components/shared/ControledInput";
import { inputFormStep1Rules } from "./inputFormStep1Rules";

const FormStep1 = ({ values, onChange }) => {
	return (
		<>
			{inputFormStep1Rules.map((input) => (
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

export default FormStep1;
