import './ErrorMessage.scss';

const ErrorMessage = ({ id, children }: { id?: string; children: React.ReactNode }) => {
  return (
    <div id={id} role="alert" className="c-error-message">
      {children}
    </div>
  );
};
export default ErrorMessage;
