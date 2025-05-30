import axios from "axios";
import { useState } from "react";

function App() {
    const [sqlSchema, setSqlSchema] = useState("");
    const [question, setQuestion] = useState("");
    const [orm, setOrm] = useState("django");
    const [language, setLanguage] = useState("python");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setResult("");
        try {
            const response = await axios.post("http://localhost:8000/convert", {
                sql_schema: sqlSchema,
                orm,
                language,
                question,
            });
            setResult(response.data.result || response.data.error);
        } catch (err) {
            setResult("Error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    ORM Query Generator
                </h1>

                <label className="block mb-2 font-semibold text-gray-700">
                    Database Schema
                </label>
                <textarea
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6 resize-none"
                    rows={6}
                    placeholder="Paste your SQL schema here..."
                    value={sqlSchema}
                    onChange={(e) => setSqlSchema(e.target.value)}
                />

                <label className="block mb-2 font-semibold text-gray-700">
                    Your Question
                </label>
                <input
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                    placeholder="Ask a question about your schema..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <div className="flex gap-4 mb-6">
                    <select
                        value={orm}
                        onChange={(e) => setOrm(e.target.value)}
                        className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400">
                        <option value="django">Django</option>
                        <option value="sqlalchemy">SQLAlchemy</option>
                        <option value="peewee">Peewee</option>
                        <option value="tortoise">Tortoise ORM</option>
                        <option value="pony">Pony ORM</option>
                        <option value="sqlmodel">SQLModel</option>
                        <option value="hibernate">Hibernate</option>
                        <option value="eclipselink">EclipseLink</option>
                        <option value="mybatis">MyBatis</option>
                        <option value="spring_data_jpa">Spring Data JPA</option>
                        <option value="sequelize">Sequelize</option>
                        <option value="prisma">Prisma</option>
                        <option value="typeorm">TypeORM</option>
                        <option value="objection">Objection.js</option>
                        <option value="waterline">Waterline</option>
                        <option value="efcore">Entity Framework Core</option>
                        <option value="dapper">Dapper</option>
                        <option value="nhibernate">NHibernate</option>
                        <option value="eloquent">Eloquent</option>
                        <option value="doctrine">Doctrine</option>
                        <option value="propel">Propel</option>
                        <option value="diesel">Diesel</option>
                        <option value="seaorm">SeaORM</option>
                        <option value="gorm">GORM</option>
                        <option value="ent">Ent</option>
                        <option value="activerecord">ActiveRecord</option>
                        <option value="slick">Slick</option>
                        <option value="ecto">Ecto</option>
                    </select>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="php">PHP</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                        <option value="scala">Scala</option>
                        <option value="elixir">Elixir</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="swift">Swift</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
                    disabled={loading}>
                    {loading ? "Generating..." : "Generate ORM Query"}
                </button>

                {loading && (
                    <div className="text-center mt-6 text-blue-600 font-medium animate-pulse">
                        Generating query, please wait...
                    </div>
                )}

                {result && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Generated ORM Query:
                        </h2>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">
                            {result}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
