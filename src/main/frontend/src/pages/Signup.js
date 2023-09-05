import React, { useState } from 'react';
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

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        grade: '',
        major: '',
        email: '',
        phoneNumber: '',
        studentID: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: 유효성 검사 및 회원가입 로직 구현

        // 예시: 필수 입력 사항이 모두 입력되었는지 확인
        if (
            formData.username &&
            formData.fullName &&
            formData.grade &&
            formData.major &&
            formData.email &&
            formData.phoneNumber &&
            formData.studentID &&
            formData.password
        ) {
            // 필수 입력 사항이 모두 입력된 경우, 회원가입 로직 수행
            console.log('회원가입 시도:', formData);

            // TODO: API 호출 또는 회원가입 로직 추가
        } else {
            alert('모든 필수 입력 사항을 입력하세요.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Wrapper>
            <Header />
            <Title>회원가입</Title>
            <FormTable>
                <ColGroup>
                    <col />
                    <col />
                </ColGroup>
                <TBody>
                    <TableRow>
                        <td>
                            <InputInform>아이디</InputInform>
                        </td>
                        <td>
                            <InputField
                                type="text"
                                name="username"
                                value={formData.username}
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
                                name="fullName"
                                value={formData.fullName}
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
                            <InputInform>비밀번호</InputInform>
                        </td>
                        <td>
                            <InputField
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </td>
                    </TableRow>
                </TBody>
            </FormTable>
            <Button type="submit">회원가입</Button>
        </Wrapper>
    );
}

export default Signup;
