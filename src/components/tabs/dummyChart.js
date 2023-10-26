function DummyChart() {
  return (
    <div style={{ display: "flex", columnGap: 40, marginTop: 20 }}>
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "#e3f2fd",
        }}
      ></div>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <li style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "#e3f2fd",
              width: 20,
              height: 20,
              marginRight: 5,
            }}
          ></div>
          - item 1
        </li>
      </ul>
    </div>
  );
}

export default DummyChart;
