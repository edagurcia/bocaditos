import { Group } from "../../styles/form.elements";

const FormStep3 = ({ values, onChange }) => {
	return (
		<>
			<Group>
				<label>Twitter</label>
				<input
					type="text"
					name="twitter"
					placeholder="https://twitter.com/usuario"
					autoComplete="off"
					value={values.twitter}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
			<Group>
				<label>Facebook</label>
				<input
					type="text"
					name="facebook"
					placeholder="https://facebook.com/usuario"
					autoComplete="off"
					value={values.facebook}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
		</>
	);
};

export default FormStep3;
