import httpClient from './httpClient';

const apiPostRegisterLibraryCard = ({url, memberInfo}) => httpClient.post(url, memberInfo);

export {
    apiPostRegisterLibraryCard,
}