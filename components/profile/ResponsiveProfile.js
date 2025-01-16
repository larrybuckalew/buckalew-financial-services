function InfoField({ label, value }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}

function SettingLink({ title, description, path }) {
  return (
    <a
      href={path}
      className="block hover:bg-gray-50 p-4 -m-4 rounded-lg transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-base font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </a>
  );
}
