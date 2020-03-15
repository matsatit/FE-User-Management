/**
 * Hàm này dùng để giải thích cách code coverage hoạt động.
 * Các bạn chú ý vào điều kiện, nhánh và câu lệnh nhé.
 * 
 * Các bạn đừng thay đổi format của code nhé
 * 
 * Làm sao để tính branch, statement?
 * Ref: 
 * 	https://www.istqb.guru/how-to-calculate-statement-branchdecision-and-path-coverage-for-istqb-exam-purpose/
 *  https://www.guru99.com/code-coverage.html
 * 
 * 
 * @param {*} yearOld Tuổi
 * @param {*} userName Tên
 */
export const getUserInfor = (yearOld, userName) => {

	let output = [];
	

	if (
		typeof yearOld === "number" && 
		typeof userName === "string") {
		output.push(`User name: ${userName} - ${yearOld} year old(s)`);
	} else {
		// Một dòng nhưng 2 câu lệnh
		output.push("Invalid input"); return;
	}

	// Một dòng nhưng 2 câu lệnh
	if (yearOld > 18) { output.push(`${userName} is an adult`); }

	// 2 dòng và 2 câu lệnh
	else if (yearOld > 1 && yearOld < 13 && userName === "c") { 
		output.push(`${userName} is a child`); 
	}

	if (userName.length % 2 === 0) {
		output.push(`${userName} is a man`);
	} else {
		output.push(`${userName} is a woman`);
	}

	return output;
}

export const oneMoreFunction = () => {
	return "Nothing";
}
