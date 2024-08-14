// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "healthtoken.sol";

contract MedicalRecords {

    address public owner;
    HealthToken public healthToken;

    struct MedicalRecord {
        string name;
        string gender;
        string birthDate;
        string homePhone;
        string addr1;
        string addr2;
        string city;
        string state;
        string zipcode;
        string[] diagnosis;
        mapping(address => bool) authorizedProviders;
    }

    mapping(address => MedicalRecord) public medicalRecords;
    mapping(address => address[]) public authorizedPatients;

    event MedicalRecordUpdated(address indexed patient);
    event AuthorizationGranted(address indexed patient, address indexed provider);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function addOrUpdateMedicalRecord(
        string memory _name,
        string memory _gender,
        string memory _birthDate,
        string memory _homePhone,
        string memory _addr1,
        string memory _addr2,
        string memory _city,
        string memory _state,
        string memory _zipcode,
        string[] memory _diagnosis
    ) public payable {
        medicalRecords[msg.sender].name = _name;
        medicalRecords[msg.sender].gender = _gender;
        medicalRecords[msg.sender].birthDate = _birthDate;
        medicalRecords[msg.sender].homePhone = _homePhone;
        medicalRecords[msg.sender].addr1 = _addr1;
        medicalRecords[msg.sender].addr2 = _addr2;
        medicalRecords[msg.sender].city = _city;
        medicalRecords[msg.sender].state = _state;
        medicalRecords[msg.sender].zipcode = _zipcode;
        medicalRecords[msg.sender].diagnosis = _diagnosis;

        emit MedicalRecordUpdated(msg.sender);
    }
    function getMedicalRecord(address _patient) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string[] memory) {
        require(medicalRecords[_patient].authorizedProviders[msg.sender], "Unauthorized access");

        MedicalRecord storage record = medicalRecords[_patient];
        return (
            record.name,
            record.gender,
            record.birthDate,
            record.homePhone,
            record.addr1,
            record.addr2,
            record.city,
            record.state,
            record.zipcode,
            "Authorized access",
            record.diagnosis
        );
    }

    function grantAccess(address _provider) public {
        require(msg.sender != _provider, "Patients cannot grant access to themselves");
        medicalRecords[msg.sender].authorizedProviders[_provider] = true;
        authorizedPatients[_provider].push(msg.sender);

        emit AuthorizationGranted(msg.sender, _provider);
    }

    function getAuthorizedPatients(address _provider) public view returns (address[] memory) {
        return authorizedPatients[_provider];
    }

    function getAllMedicalRecords(address _provider) public view returns (string[][] memory) {
        address[] memory authorizedPatientsList = authorizedPatients[_provider];
        string[][] memory records = new string[][](authorizedPatientsList.length);

        for (uint i = 0; i < authorizedPatientsList.length; i++) {
            require(medicalRecords[authorizedPatientsList[i]].authorizedProviders[_provider], "Unauthorized access");

            MedicalRecord storage patientRecord = medicalRecords[authorizedPatientsList[i]];
            records[i] = new string[](11);
            records[i][0] = patientRecord.name;
            records[i][1] = patientRecord.gender;
            records[i][2] = patientRecord.birthDate;
            records[i][3] = patientRecord.homePhone;
            records[i][4] = patientRecord.addr1;
            records[i][5] = patientRecord.addr2;
            records[i][6] = patientRecord.city;
            records[i][7] = patientRecord.state;
            records[i][8] = patientRecord.zipcode;
            records[i][9] = "Authorized access";
            records[i][10] = string(abi.encodePacked("[", stringJoin(patientRecord.diagnosis, ","), "]"));
        }

        return records;
    }

    function stringJoin(string[] memory strings, string memory separator) internal pure returns (string memory) {
        if (strings.length == 0) return "";
        if (strings.length == 1) return strings[0];

        string memory result;
        for (uint i = 0; i < strings.length - 1; i++) {
            result = string(abi.encodePacked(result, strings[i], separator));
        }

        result = string(abi.encodePacked(result, strings[strings.length - 1]));

        return result;
    }
}
