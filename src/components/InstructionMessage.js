function InstructionMessage({ isExplained, isGenerated }) {
  if (isExplained) {
    return (
      <h4 className="text-gray-400">
        Type the Formula you would like to understand
      </h4>
    );
  }
  if (isGenerated) {
    return (
      <h4 className="text-gray-400">
        Describe the Formula you would like to generate, try to be as detailed
        as possible
      </h4>
    );
  }
  return null; // If neither is true, render nothing
}

export default InstructionMessage;
