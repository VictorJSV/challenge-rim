import './ErrorMessage.scss';

const ErrorMessage = ({ id, children }: { id?: string; children: React.ReactNode }) => {
  return (
    <div id={id} role="alert" className="c-error-message">
      <div aria-hidden="true">Icon</div>
      {children}
    </div>
  );
};
export default ErrorMessage;
