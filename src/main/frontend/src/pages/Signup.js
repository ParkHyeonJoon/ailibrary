import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../common/Button';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  margin-top: 150px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;

const FormTable = styled.table`
  width: 700px;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 40px;
`;

const ColGroup = styled.colgroup`
  col:nth-child(1) {
    width: 20%;
  }

  col:nth-child(2) {
    width: 80%;
  }
`;

const TBody = styled.tbody`
  /* 행 사이에 아주 연한 회색 줄을 추가합니다. */

  tr:not(:last-of-type) {
    border-bottom: 1px solid #eaeaea;
  }
`;

const TableRow = styled.tr`
  td {
    padding: 30px;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid #c4c4c4;
  padding: 2.5px;
`;

const InputInform = styled.p`
  font-size: 14px;
  margin: 0;
`;
const SelectGrade = styled.select`
  width: 200px;
  height: 35px;
  border: 1px solid #c4c4c4;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function Signup() {
    const [formData, setFormData] = useState({
        studentID: '',
        userName: '',
        major: '',
        grade: '',
        email: '',
        phoneNumber: '',
        userID: '',
        password: '',
        confirmPassword: '', // 비밀번호 확인 추가
    });

    // 비밀번호 확인 메시지 상태
    const [passwordMatch, setPasswordMatch] = useState('');

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({
            ...formData,
            password,
        });
        checkPasswordMatch(password, formData.confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        setFormData({
            ...formData,
            confirmPassword,
        });
        checkPasswordMatch(formData.password, confirmPassword);
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        if (password === confirmPassword) {
            setPasswordMatch('비밀번호 일치');
        } else {
            setPasswordMatch('입력하신 비밀번호와 일치하지 않습니다.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인 로직 추가
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch('입력하신 비밀번호와 일치하지 않습니다.');
            return; // 비밀번호가 일치하지 않으면 회원가입 요청을 보내지 않음
        }

        // 예시: 필수 입력 사항이 모두 입력되었는지 확인
        if (
            formData.studentID &&
            formData.userName &&
            formData.major &&
            formData.grade &&
            formData.email &&
            formData.phoneNumber &&
            formData.userID &&
            formData.password &&
            formData.confirmPassword
        ) {
            // 필수 입력 사항이 모두 입력된 경우, 회원가입 로직 수행

            // API 엔드포인트 URL
            const apiUrl = 'http://localhost:8080/user';

            // 회원가입 요청 데이터 생성
            const requestBody = {
                userStuId: formData.studentID,
                userName: formData.userName,
                userMajor: formData.major,
                userGrade: formData.grade,
                userEmail: formData.email,
                userPnum: formData.phoneNumber,
                userId: formData.userID, // 아이디로 사용
                userPw: formData.password,
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('회원가입 성공:', responseData);
                    alert('회원가입에 성공하셨습니다');
                    // TODO: 회원가입 성공 후 추가 작업 수행
                } else {
                    // 오류 처리
                    console.error('회원가입 실패:', response.statusText);
                    alert('회원가입에 실패했습니다.');
                }
            } catch (error) {
                console.error('오류 발생:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        } else {
            alert('모든 필수 입력 사항을 입력하세요.');
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setPasswordMatch(''); //입력 값이 변경될 때마다 비밀번호 확인 메시지 초기화
    };

    return (
        <Wrapper>
            <Header/>
            <Title>회원가입</Title>
            <SignupForm onSubmit={handleSubmit}>
                <FormTable>
                    <ColGroup>
                        <col/>
                        <col/>
                    </ColGroup>
                    <TBody>
                        <TableRow>
                            <td>
                                <InputInform>학번</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="text"
                                    name="studentID"
                                    value={formData.studentID}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>이름</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>전공</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="text"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>학년</InputInform>
                            </td>
                            <td>
                                <SelectGrade
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleInputChange}
                                >
                                    <option value="1">1학년</option>
                                    <option value="2">2학년</option>
                                    <option value="3">3학년</option>
                                    <option value="4">4학년</option>
                                </SelectGrade>
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>이메일</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>핸드폰번호</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>아이디</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="text"
                                    name="userID"
                                    value={formData.userID}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>비밀번호</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                />
                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <InputInform>비밀번호 확인</InputInform>
                            </td>
                            <td>
                                <InputField
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                {/* 비밀번호 확인 메시지 */}
                                <p style={{fontSize: '14px', color: 'red'}}>{passwordMatch}</p>
                            </td>
                        </TableRow>
                    </TBody>
                </FormTable>
                <Button type="submit">회원가입</Button>
            </SignupForm>
        </Wrapper>
    );
}

export default Signup;