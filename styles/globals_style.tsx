import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{fontSize: string}>`
  body {
    font-size: ${(props: any) => props.fontSize}px;
  }

  .ant-table-tbody>tr:last-child>td:first-child {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-table-thead>tr>th {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-table-tbody>tr:last-child>td:first-child {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-table-tbody>tr:last-child>td:last-child {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-table-cell {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-btn {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .summary-text {
    font-size: ${(props: any) => props.fontSize}px !important;
  }

  .ant-form-item-label {
    font-size: ${(props: any) => props.fontSize}px !important;
  }
`;


 
export default GlobalStyle;