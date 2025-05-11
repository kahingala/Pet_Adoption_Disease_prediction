import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch product list');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove product');
    }
  };

  const exportToCSV = () => {
    const csvData = list.map((item) => ({
      Name: item.name,
      Category: item.category,
      Price: item.price,
      Image: item.image[0],
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'products_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Products Inventory Report', 14, 20);

    // Summary
    const totalValue = list.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    const categoryCounts = list.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    let summaryY = 30;
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFillColor(230, 240, 255);
    doc.rect(12, summaryY - 8, 180, 8 + (Object.keys(categoryCounts).length + 2) * 6, 'F');
    doc.text(`Total Products: ${list.length}`, 14, summaryY);
    doc.text(`Total Inventory Value: ${currency}${totalValue}`, 14, summaryY + 6);
    doc.text(`Products Per Category:`, 14, summaryY + 12);

    let offsetY = summaryY + 18;
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      doc.text(`• ${cat}: ${count}`, 18, offsetY);
      offsetY += 6;
    });

    // Table
    const tableData = list.map((item) => [
      item.name,
      item.category,
      `${currency}${item.price}`,
      item.image[0],
    ]);

    autoTable(doc, {
      startY: offsetY + 6,
      head: [['Name', 'Category', 'Price', 'Image URL']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
      },
      styles: {
        cellPadding: 3,
      },
      columnStyles: {
        3: { cellWidth: 60 },
      },
    });

    doc.save('products_report.pdf');
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>

      {/* Report Summary */}
      <div className="mb-4 p-2 border bg-blue-50 rounded text-sm">
        <p>
          <b>Total Products:</b> {list.length}
        </p>
        <p>
          <b>Total Inventory Value:</b>{' '}
          {currency}
          {list.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
        </p>
        <p>
          <b>Products Per Category:</b>
        </p>
        <ul className="list-disc list-inside">
          {Object.entries(
            list.reduce((acc, item) => {
              acc[item.category] = (acc[item.category] || 0) + 1;
              return acc;
            }, {})
          ).map(([category, count], i) => (
            <li key={i}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>

      {/* Export Buttons */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={exportToCSV}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToPDF}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          Export to PDF
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Edit</b>
          <b className="text-center">Remove</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => navigate(`/update/${item._id}`)}
              className="text-right md:text-center cursor-pointer text-blue-500"
            >
              Edit
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-red-500"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;