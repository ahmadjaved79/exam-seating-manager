import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './seat-allocator.css';
import Navbar from './components/Navbar';

function SeatAllocatorCpy() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState([]);
  const [students,setStudents]=useState([]);
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [selectedExamName, setSelectedExamName] = useState(null);

  const rollBoxRef = useRef(null);
  const deptMap = {
    '01': 'CIVIL',
    '02': 'EEE',
    '03': 'MECH',
    '04': 'ECE',
    '05': 'CSE',
    '12': 'IT',
  };

  const [roomNo, setRoomNo] = useState(() => {
    const data = JSON.parse(localStorage.getItem("examData"));
    return data?.roomNo || "";
  });

  const [examDate, setExamDate] = useState(() => {
    const data = JSON.parse(localStorage.getItem("examData"));
    return data?.examDate || "";
  });

  const [examTime, setExamTime] = useState(() => {
    const data = JSON.parse(localStorage.getItem("examData"));
    return data?.examTime || "";
  });

  
  
  const examTypeOptions = [
    { value: 'Internal', label: 'Internal Exam' },
    { value: 'External', label: 'External Exam' },
    { value: 'Weekly', label: 'Weekly Text' },
  ];

  const examNameOptions = [
    { value: 'Mid-1', label: 'Mid-1 Exam' },
    { value: 'Mid-2', label: 'Mid-2 Exam' },
    { value: 'final', label: 'Final Exam' },
    { value: 'weekly test-1', label: 'weekly test-1' },
    { value: 'weekly test-2', label: 'weekly test-2' },

  ];
  
  
  //accessing data from the local server
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("examData"));
    if (storedData) {
      setRoomNo(storedData.roomNo || "");
      setExamDate(storedData.examDate || "");
      setExamTime(storedData.examTime || "");
      setSelectedExamType(storedData.ExamType || "")
    }
  }, []);
  
  //savinng user data locally (local storage)
  useEffect(() => {
    const examInfo = { roomNo, examDate, examTime,selectedExamType };
    localStorage.setItem("examData", JSON.stringify(examInfo));
  }, [roomNo,  examDate, examTime, selectedExamType]);



  //add students into array
  const addStudent = () => {
    const rollBox = rollBoxRef.current;
    const text = rollBox.innerText;
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length === 10);

    const parsed = lines.map((roll) => {
      const courseChar = roll.charAt(5);
      let branch = 'UNKNOWN';

      if (courseChar === 'A') {
        branch = deptMap[roll.substring(6, 8)] || 'UNKNOWN';
      } else if (courseChar === 'E') {
        branch = 'MBA';
      } else if (courseChar === 'D') {
        branch = 'MTECH';
      }

      return { roll, branch };
    });

    setStudents(parsed);
  };

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  const isSafe = (grid, row, col, branch) => {
    for (const [dx, dy] of directions) {
      const r = row + dx;
      const c = col + dy;
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        const student = grid[r][c];
        if (student && student.branch === branch) {
          return false;
        }
      }
    }
    return true;
  };

  const getEmptyCells = (grid) => {
    const empty = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!grid[r][c]) empty.push([r, c]);
      }
    }
    return empty;
  };

  const arrangeSeating = () => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
    const totalSeats = rows * cols;
    const studentList = [...students];

    const branchCount = {};
    for (let s of studentList) {
      branchCount[s.branch] = (branchCount[s.branch] || 0) + 1;
    }

    studentList.sort((a, b) => branchCount[b.branch] - branchCount[a.branch]);

    const backtrack = (index, placed) => {
      if (index === studentList.length || placed === totalSeats) return index;
      const student = studentList[index];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!newGrid[r][c] && isSafe(newGrid, r, c, student.branch)) {
            newGrid[r][c] = student;
            const result = backtrack(index + 1, placed + 1);
            if (result === studentList.length) return result;
            if (result > placed) return result;
            newGrid[r][c] = null;
          }
        }
      }
      return index;
    };

    const constraintCount = backtrack(0, 0);
    const unplacedStudents = studentList.slice(constraintCount);
    const remainingSeats = getEmptyCells(newGrid);

    for (let i = 0; i < unplacedStudents.length && i < remainingSeats.length; i++) {
      const [r, c] = remainingSeats[i];
      newGrid[r][c] = unplacedStudents[i];
    }

    setGrid(newGrid);
  };
  

  //downloading pdf code 
  const downloadPDF = async () => {
    const input = document.getElementById('table-area');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${selectedExamName}_SeatMatrix.pdf`);
    });
  };
  

  //auto formatting user number data
  const autoFormat = () => {
    const rollBox = rollBoxRef.current;
    const text = rollBox.innerText.replace(/\s+/g, '');
    let formatted = '';

    for (let i = 0; i < text.length; i += 10) {
      formatted += text.slice(i, i + 10) + '\n';
    }

    // Maintain cursor position
    const selection = window.getSelection();
    const range = document.createRange();
    rollBox.innerText = formatted.trim();

    range.selectNodeContents(rollBox);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium text-gray-700">Rows</label>
          <input type="number" value={rows} onChange={(e) => setRows(+e.target.value)} className="w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Columns</label>
          <input type="number" value={cols} onChange={(e) => setCols(+e.target.value)} className="w-full border rounded px-3 py-1" />
        </div>
        <div>
        <h1>Enter student Numbers</h1>
        <div id="rollBox"
           contentEditable={true}
           ref={rollBoxRef}
           onInput={autoFormat}>
        </div>
        </div>
        <button onClick={addStudent} className="md:col-span-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-300">
          ➕ Add Student
        </button>
        <div>
          <label className="block">Exam Name</label>
          <Select
           id="examType"
           options={examNameOptions}
           value={selectedExamName}
           onChange={setSelectedExamName}
           placeholder="Select exam Name....."
           isClearable
         />
        </div>
        <div>
         <label htmlFor="examType">Exam Type:</label>
           <Select
           id="examType"
           options={examTypeOptions}
           value={selectedExamType}
           onChange={setSelectedExamType}
           placeholder="Select exam type..."
           isClearable
         />
        </div>

        <div>
          <label className="block">Room No</label>
          <input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} className="w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block">Exam Date</label>
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full border rounded px-3 py-1" />
        </div>
        <div>
          <label className="block">Exam Time</label>
          <input type="time" value={examTime} onChange={(e) => setExamTime(e.target.value)} className="w-full border rounded px-3 py-1" />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={arrangeSeating} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-all">🎲 Generate Seating</button>
        <button onClick={downloadPDF} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-all">⬇️ Download PDF</button>
      </div>

      {grid.length > 0 && (
        <div id="table-area" className="overflow-x-auto">
          <Navbar/>
          <p>📝 Exam Name: <strong>{selectedExamName?.label || 'Not Selected'}</strong></p>
          <p>📍 Room No: <strong>{roomNo}</strong></p>
          <p>📅 {examDate} | 🕒 {examTime}</p>
          <p>📝 Exam Type: <strong>{selectedExamType?.label || 'Not Selected'}</strong></p>
          <br/>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <tbody>
    {grid.map((row, i) => (
      <tr key={i}>
        {row.map((cell, j) => (
          <td
            key={j}
            style={{
              border: '1px solid #000',
              padding: '4px',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {cell ? `${cell.roll}` : "--"}<br />
            {cell ? `${cell.branch}` : "--"}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}
    </div>

    </>
  );
}

export default SeatAllocatorCpy;
